import express from 'express';
import UserController from './user.controller.js'

//creating object of user contrroler to acess the method that defined in the user controller class
const userController = new UserController();
const userRoutes = express.Router();

userRoutes.post('/register', (req, res, next) => {
    userController.addUser(req, res, next);
})

userRoutes.post('/login', (req, res, next) => {
    userController.userlogin(req, res, next);
})

userRoutes.get('/', (req, res, next) => {
    userController.findAllUser(req, res, next);
})

userRoutes.get('/:id', (req, res, next) => {
    userController.findUserById(req, res, next);
})
export default userRoutes;