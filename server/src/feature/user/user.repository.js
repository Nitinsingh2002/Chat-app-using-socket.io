import userModel from './user.schema.js';

export default class userRepository {
    // Function to check if a user already exists
    async checkUserExist(email) {
        return await userModel.findOne({ email });
    }


    // Function to create a new user
    async createUser(name, email, password) {
        // Validate inputs
        if (!name || !email || !password) {
            throw new Error('ValidationError: Name, email, and password are required');
        }

        // Check if the user already exists
        const existingUser = await this.checkUserExist(email);
        if (existingUser) {
            throw new Error('UserExistsError: User already exists');
        }

        // Create a new user and save it
        const newUser = new userModel({ name, email, password });
        await newUser.save(); // Await the save operation
        return newUser;
    }



    async findAllUser() {
        return await userModel.find({},{password:0});
    }

    async findUserById(id) {
        console.log("function reach here ")
        const user = await userModel.findById(id, { password: 0 });
        return user;
    }
}
