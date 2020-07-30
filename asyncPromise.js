
//***********************Handling asynchronous code with Promises******************************* */

const p1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(1);
    },2000);
  
    
});

// p.then((result) => console.log(result))
// .catch(err => console.log('error',err.message));


const p2 = new Promise((resolve,reject) => {
    setTimeout(()=> {
        resolve(2);
    },2000);
});

Promise.all([p1,p2])
.then(result => console.log(result))
.catch(err => console.log(err.message));