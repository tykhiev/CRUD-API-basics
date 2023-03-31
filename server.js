const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./Models/productModel');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send("Hello Node API");
})
app.get('/blog', (req, res) => {
    res.send("Hello Blog welcome to the guys");
})

//get all products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500, json(error.message))
    }
})


//create a product
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
})

//get a certain product
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        res.status(500, json(error.message))
    }
})

//update a product
app.put('/products/:id', async(req, res) =>  {
    try{
        console.log(req.params)
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({message: `cannot find id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error){
        res.status(500, json(error.message))
    }
})

//delete a product
app.delete('products/:id', async(req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    try{

        if (!product) {
            return res.status(404).json({message: `cannot find id ${id}`})
        }
        res.status(200).json(product)
    }
 catch (error){
    res.status(500, json(error.message))
}
})

//mongodb connection
mongoose.connect('mongodb+srv://admin:33669999ty@learnapi.jkhs6hq.mongodb.net/Node-API-test?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => {
        console.log('node API app is running on port 3000')
    });
    console.log('connected to MongoDB');
}).catch((error) => {
    console.log('error')
})