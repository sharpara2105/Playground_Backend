const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //this is a middleware that sets req.body property
// which means route() will have req.body property populated in which we can do some processing and finally return response to the client.

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

//**********************************************read operation : get*************************************
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


//********************************** */ create opearation : post **************************************

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
    // const result = Joi.validate(req.body,schema); //deprecated in the newer versions.
    const result = schema.validate(req.body);  
    console.log(result);// it doesn't return true false but the actual object.
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    products.push(p);
    res.json(p);  //or res.send(p) also works fine however, res.write(p) doesn't work.

})

// ***********************************Update operation : PUT********************************

app.put('/api/clothing/:id',(req,res) => {
// (i) look up the product, if not existing,return 404
    const product = products.find(c=> c.product_code === parseInt(req.params.id))
    // (ii) validate input, If invalid, return 400 (bad request)
    if(!product) {
        res.status(404).send(`The course with the given id doesn't exist`); 
        return;  
    }
    const {error} = validateProduct(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //if valid, update the course and return the updated course.

    product.product_name = req.body.product_name;
    //res.send(product);
    //or use res.write() and res.end()
    res.write(product.product_name.toString());
    res.end();
    
    });
    
function validateProduct(product) {
    const schema = Joi.object({
        product_name : Joi.string().min(3).required()
    });
    return schema.validate(product);
}

//******************* http delete request************************** */

app.delete('/api/clothing/:id',(req,res) => {
    // look up the product, if not existing,return 404
    const product = products.find(c=> c.product_code === parseInt(req.params.id))
    if(!product) {
        res.status(404).send(`The course with the given id doesn't exist`); 
        return;  
    }
    const index = products.indexOf(product);
    products.splice(index,1);
    res.send(products);
    
});



app.listen(port,()=> console.log(`Listening on port ${port}`));

