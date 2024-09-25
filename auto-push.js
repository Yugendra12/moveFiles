const { exec } = require('child_process');

// Function to execute shell commands
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      } else if (stderr) {
        reject(`stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

async function uploadToGit() {
  try {
    await runCommand('git init');  // Initialize Git (if not already)
    await runCommand('git add .'); // Stage changes
    await runCommand('git commit -m "Initial commit"'); // Commit changes
    await runCommand('git remote add origin https://github.com/RoomNo55/WDIO.js.git'); // Add remote
    await runCommand('git push -u origin main'); // Push changes to GitHub
    console.log('Code uploaded to GitHub successfully!');
  } catch (error) {
    console.error(error);
  }
}

uploadToGit();
