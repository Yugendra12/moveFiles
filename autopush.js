const fs = require('fs');
const path = require('path');

const sourceDir = './source';  // Source folder path
const destDir = './features';  // Destination folder path

// Function to move files if they don't exist in the destination
function moveFiles() {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      return console.error(`Error reading source directory: ${err.message}`);
    }

    files.forEach((file) => {

      if (file.endsWith('.feature')){
      const sourceFilePath = path.join(sourceDir, file);
      const destFilePath = path.join(destDir, file);

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
    } else {
      console.log(`This is not a Feature file: ${file}`);
    }
    });
  });
}

moveFiles();
1