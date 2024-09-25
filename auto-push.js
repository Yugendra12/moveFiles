const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

// Set up your git repository pathconst repoPath = path.join(__dirname, 'your-repo-path'); // Replace with your repo path// Initialize simple-gitconst git = simpleGit(repoPath);
// Function to add, commit, and push changesasync function autoPush() {
    try {
        // Change directory to the repo path        process.chdir(repoPath);

        // Check if there are any changesconst status = await git.status();
        if (status.files.length === 0) {
            console.log('No changes to commit.');
            return;
        }
        // Add changes to stagingawait git.add('.');
        console.log('Added changes to staging.');

        // Commit changesconst commitMessage = 'Automated commit'; // Customize your commit messageawait git.commit(commitMessage);
        console.log(`Committed changes: ${commitMessage}`);

        // Push changesawait git.push('origin', 'main'); // Change 'main' to your branch name if neededconsole.log('Changes pushed to repository.');
    } catch (error) {
        console.error('Error during git operations:', error);
    }
}

// Execute the auto-push functionautoPush();