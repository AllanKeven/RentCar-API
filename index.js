require("./instrument");

const Sentry = require("@sentry/node");
const express = require('express');
const { PrismaClient } = require('./generated/prisma')
const app = express();
const port = 3001;

const cors = require('cors');



const prisma = new PrismaClient();
app.use(express.json())
app.use(cors());


app.get('/cars', async (req, res) => {
  const allCars = await prisma.car.findMany();


  res.status(200).json(allCars)
})

app.post('/cars', async (req, res) => {

  const { name, price, category, transmission, fuel, seats, image, avaliable } = req.body

  try {
    const newcar = await prisma.car.create({
      data: {
        name,
        price,
        category,
        transmission,
        fuel,
        seats,
        image,
        avaliable
      }
    })
    res.status(201).send('Anuncio criado com suceso ' + newcar)

  } catch (error) {
    console.error(error)
  }



});

app.put('/cars/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, transmission, fuel, seats, image, avaliable } = req.body;

  try {
    const updateCar = await prisma.car.update({
      where: {
        id: id
      },
      data: {
        name,
        price,
        category,
        transmission,
        fuel,
        seats,
        image,
        avaliable
      }
    });

    res.status(200).json(updateCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o carro' });
  }

});


app.delete('/cars/:id', async (req, res) => {

  const { id } = req.params

  try {
    const deletedCar = await prisma.car.delete({
      where: {
        id: id
      }

    })

    res.status(200).json(deletedCar);
  } catch (error) {
    res.status(404).json({ error: "Car not found" })
  }

})

/*
  EXEMPLO DO ERRO DO SENTRY

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
  
*/

Sentry.setupExpressErrorHandler(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
