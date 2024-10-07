const simpleGit = require("simple-git");
const fs = require('fs');          // Importing the file system module
const path = require('path');      // Importing the path module

// Define the source directory
const sourceDir = './';

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

})

const git = simpleGit();

// Check if the current directory is a git repository
async function checkGitRepo() {
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      console.log('Not a Git repository. Initializing a new Git repository...');
      await git.init();  // Initialize a new Git repository
      console.log('Initialized a new Git repository.');
    } else {
      console.log('This is a Git repository.');
    }
  } catch (error) {
    console.error('Error checking or initializing Git repository:', error);
    process.exit(1); // Exit the script if an error occurs
  }
}
await checkGitRepo();

const remotes = await git.getRemotes(true); // List all remotes with detailed info
const originRemote = remotes.find((remote) => remote.name === "origin");

if (!originRemote) {

  await git.addRemote("origin", "https://github.com/Yugendra12/git-automation.git"); // Add remote origin if not set
  console.log("Remote origin added.");
} else {
  console.log("Remote origin already exists, skipping addRemote.");
}

const branchName = 'main';
async function gitProcess() {

    await git.add(['features/*.feature', 'step-definitions/*.java', 'autoPush.js']);
    await git.commit('Added .feature and .java files to features and step-definitions');
    await git.stash({ '--include-untracked': null });

    await git.pull('origin', branchName);
 
    await git.stash('apply');

    await git.stash('pop');

    await git.push(['-u', 'origin', branchName]);
    console.log('Files pushed to Git');
}

await gitProcess();

}

uploadToGit();