const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// app.use(bodyParser.json());

const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://dipesh:Next%40123@cluster0.flcyeme.mongodb.net/ecom')
  .then(() => console.log('DB Connected!'));


const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String
});

const User = mongoose.model('User', userSchema);

app.get('/', function (req, res) {
  res.send('Home page')
})

app.post('/register', jsonParser, (req, res) => {

  console.log("Body data", req.body);

  const { firstname, lastname, username, email } = req.body;
  const createNewUser = new User({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email
  })

  createNewUser.save().then((result) => {
    res.status(201).json({ msg: 'New Created successfully!', result: result });
  })

  // res.send('Register API')


})

app.post('/login', (req, res) => {
  res.send('Login API')
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