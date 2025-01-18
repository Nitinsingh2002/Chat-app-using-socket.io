import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { mongoConnection } from './src/config/mongodb.js'
import userRoutes from './src/feature/user/user.routes.js'
import chatRoutes from './src/feature/chat/chat.routes.js';
import groupRoutes from './src/feature/group/group.routes.js';
import jwtAuth from './src/middlware/authMiddleware.js';


const app = express();
const server = http.createServer(app);
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
dotenv.config();

//for user routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat/', chatRoutes);
app.use('/api/v1/groups', jwtAuth, groupRoutes);




const port = process.env.PORT || 3000;

server.listen(port, () => {
    mongoConnection();
    console.log(`Server is running at ${port}`);
})

