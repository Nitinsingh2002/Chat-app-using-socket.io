import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { mongoConnection } from './src/config/mongodb.js'
import userRoutes from './src/feature/user/user.routes.js'


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
dotenv.config();

//for user routes
app.use('/api/v1/user',userRoutes);




const port = process.env.PORT || 3000;

server.listen(port, () => {
    mongoConnection();
    console.log(`Server is running at ${port}`);
})

