const fs = require('fs');          // Importing the file system module
const path = require('path');      // Importing the path module

// Define the source directory
const sourceDir = './source';

// Define destination directories for different file types
const featureDestDir = './features';  // Folder for .feature files
const javaDestDir = './java';        // Folder for .java files

// Get the list of files from the source directory
const files = fs.readdirSync(sourceDir);           // Reads the content of the source directory

files.forEach((file) => {
  // Check if the file is a .feature file
  if (file.endsWith('.feature')) {
    const sourceFilePath = path.join(sourceDir, file);
    const destFilePath = path.join(featureDestDir, file);  // Move to feature destination directory
    
    // Move the file from source to destination
    fs.renameSync(sourceFilePath, destFilePath);           // Synchronous file move
    console.log(`Moved: ${file}`);
  } 
  // Check if the file is a .java file
  else if (file.endsWith('.java')) {
    const sourceFilePath = path.join(sourceDir, file);
    const destFilePath = path.join(javaDestDir, file);     // Move to java destination directory
    
    // Move the file from source to destination
    fs.renameSync(sourceFilePath, destFilePath);           // Synchronous file move
    console.log(`Moved: ${file}`);
  } else {
    console.log(`File already exists in destination: ${file}`);
  }
});
