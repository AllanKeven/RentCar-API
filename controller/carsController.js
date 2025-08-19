const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

class carsController {

    async registerCar(req, res) {
        try {

            const { name, price, category, transmission, fuel, seats, image, avaliable } = req.body

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
            res.status(201).send('Anuncio cirado com sucesso' + newcar);




        } catch (error) {
            throw new Error(error);

        }
    }

    async getCars(req,res){
        const allCars = await prisma.car.findMany();

        res.status(200).json(allCars)
    }













}
module.exports={carsController};