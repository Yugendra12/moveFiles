const simpleGit = require("simple-git");
const git = simpleGit();

async function uploadToGit() {

  await git.init(); 
    const fs = require("fs");
    const path = require("path");

    // Path to the local folder and the file you want to read
    const sourceFolderPath = path.join(__dirname,'source','abc.feature');

    // Change to your desired destination
    const destinationFilePath = path.join(__dirname,'features','abc.feature');    

    // Function to copy the filefunctioncopyFile() {
    function copyFile() {
      fs.copyFile(sourceFolderPath, destinationFilePath, (err) => {
        if (err) {
                    console.error('Error copying file:', err);
        return;
                }
                console.log('File copied successfully from', sourceFolderPath, 'to', destinationFilePath);
            });
        }

    copyFile();
      
         
        // Execute the functioncopyFile();

    await git.add("./*"); // Add all files
    await git.commit("Folder commit"); // Commit changes

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
  
  console.log("new line added");
  }

uploadToGit();