const express = require('express');
const app = express();


// and now this app object has all the crud operators that we can use : 

const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send('zakabam');   //this call back function here is also called 'Route Handler'
});
app.get('/api/clothing',(req,res) => {
    res.send(['t-shirt','shirt','pants']);   //this call back function here is also called 'Route Handler'
});
const products = [
    {product_code: 1000,
    product_name : 'unicorn',
    category: {gender : 'female',occassion:'all', type: 't-shirt'},
    price : 1000,
    currency : 'INR',
    Available : 'yes'
},
{product_code: 1001,
    product_name : 'fitness',
    category: {gender : 'female',occassion:'all', type: 'shirt'},
    price : 1500,
    currency : 'INR',
    Available : 'yes'
},
]
app.get('/api/clothing/:id',(req,res) => {
    const product = products.find(c => c.product_code === parseInt(req.params.id)); //req.params.id returns a string so we need to convert it to int for comparison.
    if(!product) 
    res.status(404).send('Product with the given code was not found');
    
    res.send(product);   //this call back function here is also called 'Route Handler'
});
app.listen(port,()=> console.log(`Listening on port ${port}`));

