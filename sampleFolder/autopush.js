const simpleGit = require('simple-git');
const git = simpleGit();

async function uploadToGit() {
  try {
    await git.init(); // Initialize Git repo
    await git.add('./*'); // Add files
    await git.commit('Initial commit'); // Commit changes
    await git.addRemote('origin', 'https://github.com/RoomNo55/WDIO.js.git'); // Add remote origin
    await git.push('origin', 'main'); // Push to main branch
    console.log('Code uploaded to GitHub successfully!');
  } catch (error) {
    console.error('Failed to upload code to GitHub:', error);
  }
}

uploadToGit();
