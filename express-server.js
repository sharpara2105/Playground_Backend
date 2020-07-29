const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

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
// and now this app object has all the crud operators that we can use : 

const port = process.env.PORT || 4000;
//read operation : get
app.get('/',(req,res) => {
    res.send('zakabam');   //this call back function here is also called 'Route Handler'
});
app.get('/api/clothing',(req,res) => {
    res.send(['t-shirt','shirt','pants']);   //this call back function here is also called 'Route Handler'
});

app.get('/api/clothing/:id',(req,res) => {
    const product = products.find(c => c.product_code === parseInt(req.params.id)); //req.params.id returns a string so we need to convert it to int for comparison.
    if(!product) 
    res.status(404).send('Product with the given code was not found');
    
    res.send(product);   //this call back function here is also called 'Route Handler'
});


// create opearation : post

app.post('/api/clothing',(req,res) => {
    const schema = Joi.object({
        product_name : Joi.string().min(3).required()
    });
    const p = {product_code: 1002,
                product_name : req.body.product_name,
                category: {gender : 'female',occassion:'all', type: 'shirt'},
                price : 1500,
                currency : 'INR',
                Available : 'yes'
    }
    // const result = Joi.validate(req.body,schema);
    const result = schema.validate(req.body);
    console.log(result);
    if(result.error) {
        res.status(400).send(result.error);
        return;
    }
    products.push(p);
    res.send(p);
    // res.json(req.body)
})


app.listen(port,()=> console.log(`Listening on port ${port}`));

