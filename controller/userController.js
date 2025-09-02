const { PrismaClient } = require('../generated/prisma');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

class userController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;


            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).send("Não foi possível criar usuário!");
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) return res.status(404).send("Usuário não encontrado!");

            // Verifica senha
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).send("Senha incorreta!");

            // Gera token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.status(200).json({
                message: "Login realizado com sucesso!",
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro no login!");
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        try {
            const updateUser = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    email,
                    password
                }
            })

            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json('Erro ao atualizar o user!');
            throw new Error(error);
        }
    }

    async deleteUser(req, res) {

        const { id } = req.params;

        try {

            const deleteUser = await prisma.user.delete({
                where: {
                    id: id
                }
            })
            res.status(200).json(deleteUser);

        } catch (error) {
            res.status(404).json("user not found");
            throw new Error(error);
        }
    }

}

module.exports = { userController };
