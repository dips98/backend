const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var jwt = require('jsonwebtoken');

const app = express();
app.use(cors())
const port = 3000;
const privateKey = 'drf';
const jsonParser = bodyParser.json();
// app.use(bodyParser.json());

const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://dipesh:Next%40123@cluster0.flcyeme.mongodb.net/ecom')
  .then(() => console.log('DB Connected!'))
  .catch((e) => {
    console.log("Data base not connected! :");
  })


const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  confirmPassword: String,
  username: String,
  contact: String,
});

const productSchema = new Schema({
  productId: String,
  productName: String,
  productRate: Number,
  productQuantity: Number,
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

app.get('/', function (req, res) {
  res.send('Home page')
})

app.post('/register', jsonParser, (req, res) => {

  console.log("Body data", req.body);

  const { firstName, lastName, userName, email, password, confirmPassword, contact } = req.body;
  const createNewUser = new User({
    firstname: firstName,
    lastname: lastName,
    contact: contact,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    username: userName,
  })

  createNewUser.save().then((result) => {
    res.status(201).json({ msg: 'New user created successfully!', result: result });
  })

})

function generate_JWT_Token(payload) {
  var token = jwt.sign(payload, privateKey);
  return token;
}

app.post('/login', jsonParser, (req, res) => {

  const {email, password} = req.body;

  User.findOne({ email: email }).then((result) => {
    if (result) {
      if (result.password == password) {
        const token = generate_JWT_Token(req.body);
        res.status(200).send({ msg: 'loginSuccess', token:token });
      }else{
        res.status(401).send({ msg: 'Incorrect Password' });
      }
    } else {
      res.status(404).send({ msg: 'User does not exist.' });
    }
  })
  console.log(req.body);
})

app.post('/addProduct',jsonParser, (req, res)=>{
  const {productId, productName, productQuantity, productRate} = req.body;
  console.log(req.body);
  const addProduct = new Product({
    productId: productId,
    productName: productName,
    productQuantity: productQuantity,
    productRate: productRate,
  })
  addProduct.save().then((result) => {
    res.status(201).send({ msg: 'Product Added successfully!', result:result});
  })
  
})

app.get('/about', function (req, res) {
  res.send('Abount page')
})

app.get('/contact', function (req, res) {
  res.send('Contact page')
})

app.get('/service', function (req, res) {
  res.send('Service page')
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log("Server running on port :", port)
})
