
console.log("before");

// *******************handling with callbacks****************************************
//1.
function getUser(id,callback){
    setTimeout((x) => {
        console.log('reading a user from a database');
        callback({id:id , name: 'Parul'});
    },2000);
}; 

//this nested structure of calling is going to cause 'callback hell'
//this problem is going to worsen if there is let's say another nested function inside getRepos e.g getCommits()

getUser(2,(user) => {
    getRepos(user.name,(repos) => {
        console.log('repos',repos);
    });
});

//2.
// synchronous version of the function:
/*
function getRepos(username) {
    return ['repo1','repo2','repo3'];
}
*/

//asynchronous version of the getRepos() :
function getRepos(username,callback) {
    setTimeout(() => {
        callback(['repos1','repos2','repos3']);
    },2000);
}



