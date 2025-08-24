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

    async getCars(req, res) {
        const allCars = await prisma.car.findMany();

        res.status(200).json(allCars)
    }

    async updatecar(req, res) {
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
            res.status(500).json('Erro ao atualizar o carro!')
            throw new Error(error);

        }

    }


    async deleteCar(req, res) {
        const { id } = req.params

        try {
            const deletedCar = await prisma.car.delete({
                where: {
                    id: id
                }

            })

            res.status(200).json(deletedCar);
        } catch (error) {
            res.status(404).json("Car not found" );
            throw new Error(error);
        }
    }










}
module.exports = { carsController };