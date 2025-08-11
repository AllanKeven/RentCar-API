const express = require('express')
const app = express()
const port = 3001;


const cors = require('cors');

app.use(express.json())
app.use(cors());

let cars = []

app.get('/cars', (req, res) => {
  //ira retorar uma lista de carros com status 200s

  res.status(200).json(cars)
})

app.post('/cars', (req, res) => {

  const { name, price, category, transmission, fuel, seats, image, avaliable } = req.body


  console.log(req.body)
  const car = {
    name,
    category,
    seats,
    price,
    transmission,
    fuel,
    image,
    avaliable

  }
  cars.push(car)
  res.status(201).json(car)
});

app.put('/cars', (req, res) => {

  
  const { name, price, category, transmission, fuel, seats, image, avaliable } = req.body;

  const newcar = {
    name,
    category,
    seats,
    price,
    transmission,
    fuel,
    image,
    avaliable

  }

  car.put(newcar);
  res.status(200).json(newcar);
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
