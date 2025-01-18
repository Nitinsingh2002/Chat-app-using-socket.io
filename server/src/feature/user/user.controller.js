import userRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default class UserController {
    constructor() {
        // Initializing user data
        this.userRepository = new userRepository();
    }

    async addUser(req, res) {
        try {
            const { name, email, password } = req.body;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            await this.userRepository.createUser(name, email, hashedPassword);

            // Respond with success
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            // Check for known errors and respond appropriately
            if (error.message.startsWith('ValidationError:')) {
                return res.status(400).json({ error: error.message.replace('ValidationError: ', '') });
            }

            if (error.message.startsWith('UserExistsError:')) {
                return res.status(409).json({ error: error.message.replace('UserExistsError: ', '') });
            }

            // Generic server error
            console.error('Error adding user:', error);
            res.status(500).json({ error: "An error occurred while creating the user." });
        }
    }



    async createToken(id, email, name) {
        const token = jwt.sign(
            { id, email, name },
            process.env.JWTKEY,
            { expiresIn: '1d' }
        );
        return token;
    }

    async userlogin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await this.userRepository.checkUserExist(email);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = await this.createToken(user.id, user.email, user.name);

            // Send token in a cookie or as a response
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: false, // Disable secure for development
                sameSite: 'lax', // Adjust to 'none' for cross-origin requests
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({ message: 'Login successful', token });

        } catch (error) {
            // console.error('Error during user login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findAllUser(req, res) {
        try {
            const users = await this.userRepository.findAllUser();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error finding users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async findUserById(req,res){
        try{
            const user = await this.userRepository.findUserById(req.params.id);
            if(!user){
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            console.error('Error finding users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}





