const simpleGit = require("simple-git");
const git = simpleGit();

const fs = require('fs');          // Importing the file system module
const path = require('path');      // Importing the path module

// Define the source directory
const sourceDir = './source';

// Define destination directories for different file types
const featureDestDir = './features';  // Folder for .feature files
const javaDestDir = './step-definitions';        // Folder for .java files

// Get the list of files from the source directory
const files = fs.readdirSync(sourceDir);           // Reads the content of the source directory


async function uploadToGit() {
  
files.forEach((file) => {
  // Check if the file is a .feature file
  if (file.endsWith('.feature')) {
    const sourceFeatureFilePath = path.join(sourceDir, file);
    const destFeatureFilePath = path.join(featureDestDir, file);  // Move to feature destination directory
    
    if (!fs.existsSync(destFeatureFilePath)) {

    // Move the file from source to destination
    fs.renameSync(sourceFeatureFilePath, destFeatureFilePath);           // Synchronous file move
    console.log(`Feature file automatically moved to destination folder: ${file}`);
  } else {
    console.log(`File already exists in destination: ${file}`);
  }
}
  // Check if the file is a .java file
   if (file.endsWith('.java')) {
    const sourceJavaFilePath = path.join(sourceDir, file);
    const destJavaFilePath = path.join(javaDestDir, file);     // Move to java destination directory

    if (!fs.existsSync(destJavaFilePath)) {

    // Move the file from source to destination
    fs.renameSync(sourceJavaFilePath, destJavaFilePath);           // Synchronous file move
    console.log(`Java file automatically moved to destination folder: ${file}`);
  } else {
      console.log(`File already exists in destination: ${file}`);
    }
}
});


// async function initializeGit() {
// try {
//   // Check if there is already a Git repository
//   const isRepo = await git.checkIsRepo();
//   if (isRepo) {
//     console.log('This directory is already a Git repository.');
//     return;
//   }
// } catch (err) {
//   console.error('Error initializing Git repository:', err);
// }


// Check if the remote "origin" already exists
const remotes = await git.getRemotes(true); // List all remotes with detailed info
const originRemote = remotes.find((remote) => remote.name === "origin");

if (!originRemote) {
  await git.addRemote("origin","https://github.com/Yugendra12/moveFiles.git"); // Add remote origin if not set
  console.log("Remote origin added.");
} else {
  console.log("Remote origin already exists, skipping addRemote.");
}

await git.add("./*"); // Add all files
await git.commit("Folder commit"); // Commit changes

    // Push to the main branch
    await git.push("origin", "main");
    console.log("Git Repo updated" + git.log);
}

uploadToGit();