const simpleGit =require('simple-git');
const path = require('path');
const dir = 'auto_Push/auto-push.js'
 
const repoPath =path.join(dir,'https://github.com/RoomNo55/WDIO.js.git');
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