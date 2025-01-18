import express from 'express';
import ChatController from './chat.controller.js';

const chatController = new ChatController();
const chatRoutes = express.Router()

// Route to create or access a single chat (personal chat)
//Reusability: Instead of creating duplicate chat entries between the same two users, 
// this API checks if a chat already exists and returns it.
chatRoutes.post('/create-or-access', (req, res, next) => {
    chatController.createOrAccessChat(req, res, next);
});


// Route to create a group chat
chatRoutes.post('/create-group', (req, res, next) => {
    chatController.createGroupChat(req, res, next);
});

// Route to rename a group chat
chatRoutes.put('/rename-group', (req, res, next) => {
    chatController.renameGroupChat(req, res, next);
});


// Route to add a member to a group
chatRoutes.put('/add-member', (req, res, next) => {
    chatController.addGroupMember(req, res, next);
});

// Route to remove a member from a group
chatRoutes.put('/remove-member', (req, res, next) => {
    chatController.removeGroupMember(req, res, next);
});


// Route to send prsonal and group message
chatRoutes.post('/send-message', (req, res, next) => {
    chatController.sendMessage(req, res, next);
});


// Route to get all messages for a chat (single or group chat)
chatRoutes.get('/:chatId/messages', (req, res, next) => {
    chatController.getMessages(req, res, next);
});


export default chatRoutes;