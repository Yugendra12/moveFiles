const simpleGit =require('simple-git');
const path = require('path');
const dir = 'src/featurefile'
 
const repoPath =path.join(dir,'https://github.com/Yugendra12/mygit-autopush.git');
const git =simpleGit(repoPath);
async function autoPush(){
 
    try{
 
        process.chdir(repoPath);
    
        console.log("hello  "+repoPath);
        return;
    } catch (error)
    {
 
    console.error('error msg'+error);
 
    }
   
}
 
autoPush;