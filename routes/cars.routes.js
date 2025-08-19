const express= require('express');
const {carsController}= require('../controller/carsController');

const carsRoutes = express.Router();

carsRoutes.get('/',new carsController().getCars);
carsRoutes.post('/', new carsController().registerCar);
//carsRoutes.put();
//carsRoutes.delete();

module.exports = carsRoutes;