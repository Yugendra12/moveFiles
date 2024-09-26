const simpleGit = require("simple-git");
const git = simpleGit();

// Function to move files if they don't exist in the destination
async function moveFiles() 
{
  await git.init();
  const fs = require("fs");
  const path = require("path");

  const sourceDir = "./source"; // Source folder path
  const destDir = "./features"; // Destination folder path

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      return console.error(`Error reading source directory: ${err.message}`);
    }

    files.forEach((file) => {
      if (file.endsWith(".feature", ".java")) {
        const sourceFilePath = path.join(sourceDir, $(file));
        const destFilePath = path.join(destDir, $(file));

        // Check if the file exists in the destination
        if (!fs.existsSync(destFilePath)) {
          // Move the file
          fs.rename(sourceFilePath, destFilePath, (err) => {
            if (err) {
              return console.error(`Error moving file: ${err.message}`);
            }

            console.log(`Moved: ${file}`);
          });
        } else {
          console.log(`File already exists in destination: ${file}`);
        }
      }
    });
  });

  await git.add("./*"); // Add all files
  await git.commit("Initial commit"); // Commit changes

  // Check if the remote "origin" already exists
  const remotes = await git.getRemotes(true); // List all remotes with detailed info
  const originRemote = remotes.find((remote) => remote.name === "origin");

  // to set remote origin git repo
  if (!originRemote) {
    await git.addRemote("origin", "https://github.com/RoomNo55/gitPushJs.git"); // Add remote origin if not set
    // console.log("Remote origin added.");
  } else {
    // console.log("Remote origin already exists, skipping addRemote.");
  }

  // Push to the main branch
  await git.push("origin", "main");
  // console.log("Code uploaded to GitHub successfully!");
}

moveFiles();
