// src/config/socket.js
import ChatModel from '../feature/chat/model.js';

export default (io) => {
    //event triggred when user connect to socket
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        //Handle joining rooms
        //Here chat id  means group id and socket represent a client
        socket.on('join-room', ({ chatId }) => {
            socket.join(chatId);
            console.log(`User ${socket.id} joined room ${chatId}`);
        });

        // Handle personal or group messages
        //chatId: The ID of the chat room where the message is being sent (can be a personal chat room or a group chat room).
        socket.on('send-message', async (data) => {
            const { chatId, sender, content } = data;

            try {
                const chat = await ChatModel.findById(chatId);
                if (!chat) {
                    socket.emit('error', { message: 'Chat not found' });
                    return;
                }

                //creating  meesage object
                const newMessage = {
                    sender,
                    content,
                    timestamp: new Date(),
                };

                chat.messages.push(newMessage);
                await chat.save();

                // If it's a group chat, send to all participants in the chat
                // For personal chat, send to the recipient

                // If it's a group chat
                if (chat.isGroupChat) {
                    //send this message to all participants in the group chat
                    io.to(chatId).emit('new-message', newMessage);
                } else {
                    //personal chat  means between two user
                    // Send to the specific recipient (find the other participant)
                    const recipient = chat.participants.find(participant => participant.toString() !== sender);

                    const recipientSocketId = users.get(recipient); // Assuming users store the socket ids
                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit('new-message', newMessage);
                    }

                }



            } catch (err) {
                console.error(err);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};
