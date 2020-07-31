// now our responses will come from mongoDB



const mongoose = require('mongoose');
const { string, number } = require('joi');

//pass the connection string which is currently referring to the mongoDB server that we installed on this machine.
//this connect method returns a promise 
mongoose.connect('mongodb://localhost/products')
.then(() => console.log('connected to mongoDB'))
.catch((err) => console.error('could not connect to MongoDB',err));

const productSchema = new mongoose.Schema({
    product_name : String,
    product_code : Number,
    price : Number,
    dateOfPurchase : {type: Date, default: Date.now},
    tags : [String]
});

const Product = mongoose.model('Products',productSchema);
//here, we simply create objects and store them in a database and that's why we call them schemaless.
// it's not able to save if i pass multiple objects here. workaround?
//To insert Multiple Documents to MongoDB using Mongoose, use Model.collection.insert(docs_array, options, callback_function); method. Callback function has error and inserted_documents as arguments.
async function createProduct() {
    const product = new Product({
        product_name  : 'fitness',
        product_code : 1001,
        price : 1200,
        tags :['clothing','shirt']
    }
    );
const result = await product.save();
console.log(result);
}
//1. saving the document
// createProduct();

//2. query the document :

// async function getCourses() {
//     const products = await Product.find({product_name : 'fitness'});
//     console.log(products);
// }

// getCourses();

//3. removing a document:

// async function removeProduct(code) {
//     const result = await Product.deleteOne({product_code : code});
//     console.log(result)
// }

// removeProduct(1000);

//5. get all the published backend products,sort them by their name and display them.
async function getPublishedProducts() {
    const result = await Product.find({tags:'apparels'}).sort({product_name:1}).select({product_name:1,tags:1,price:1});
    console.log(result);
}

getPublishedProducts();
