const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Home page')
})

app.post('/login', jsonParser,(req, res)=> {
  console.log("Body data", req.body);
  res.send('login API')
})

app.post('/register', (req, res)=> {
  res.send('Register API')
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

app.listen(port, ()=>{
  console.log("Server running on port :",port)
})