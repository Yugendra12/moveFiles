const simpleGit = require("simple-git");
const git = simpleGit();

async function uploadToGit() {
  try {
    await git.init(); // Initialize Git repo
    const fs = require("fs");
    const path = require("path");

    // Specify the file name and contentconst fileName = 'example.txt';
    const content = "Hello, world! This is a new file.";
    const fileName = "homePage.feature";

    // Create the file and write content to it
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.error("Error creating file:", err);
      } else {
        console.log(`File "${fileName}" created successfully!`);
      }
      const filePath = path.join('/Users/ethiraj.haribabu/Desktop/webDardenFramework/features', 'homePage.feature');
    });

    // Specify the folder path and file name
    // const filePath = path.join('/Users/ethiraj.haribabu/Desktop/webDardenFramework/features', 'homePage.feature');

    await git.add("./*"); // Add all files
    await git.commit("Initial commit"); // Commit changes

    // Check if the remote "origin" already exists
    const remotes = await git.getRemotes(true); // List all remotes with detailed info
    const originRemote = remotes.find((remote) => remote.name === "origin");

    if (!originRemote) {
      await git.addRemote(
        "origin",
        "https://github.com/username/repository.git"
      ); // Add remote origin if not set
      console.log("Remote origin added.");
    } else {
      console.log("Remote origin already exists, skipping addRemote.");
    }

    // Push to the main branch
    await git.push("origin", "main");
    console.log("Code uploaded to GitHub successfully!");
  } catch (error) {
    console.error("Failed to upload code to GitHub:", error);
  }
  console.log("new line added");
}

uploadToGit();
