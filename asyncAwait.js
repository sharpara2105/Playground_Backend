
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

//put all the functions calls under an async function to await the result of the operation
async function notifyCustomer() {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);
      await sendEmail(customer.email, movies);
      console.log('Email sent...');
    }
  }
  notifyCustomer();
  
  
  function getCustomer(id) {
    return new Promise((resolve, reject) => { 
        //return promise here, then only we can use async-await
      setTimeout(() => {
        //instead of callback/return, we'll use resolve here
        resolve({ 
          id: 1, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        });
      }, 4000);  
    });
  }
  
  function getTopMovies() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['movie1', 'movie2']);
      }, 4000);
    });
  }
  
  function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  }