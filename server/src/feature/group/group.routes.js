
import express from 'express'
import { GroupController } from './group.controller.js'

const groupController = new GroupController()

const groupRoutes = express.Router()


//api to create a gruop
groupRoutes.post('/create', (req, res, next) => {
    groupController.create(req, res, next);
})

// api to rename a group name
groupRoutes.put('/change-name', (req, res, next) => {
    groupController.changename(req, res, next);
})

// api to delete a group

groupRoutes.delete('/delete/:id', (req, res, next) => {
    groupController.deleteGroup(req, res, next);
})

//api to add a member to a group
groupRoutes.put('/add-user', (req, res, next) => {
    groupController.addUser(req, res, next);
})
//api to delete a member from a group 
groupRoutes.put('/remove-user', (req, res, next) => {
    groupController.removeUser(req, res, next);
})


//api to find group by id
groupRoutes.get('/find/:id', (req, res, next) => {
    groupController.findById(req, res, next);
})


export default groupRoutes;