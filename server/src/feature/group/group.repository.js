import userModel from '../user/user.schema.js'
import groupModel from './group.schema.js'
import mongoose from 'mongoose';
export class GroupRepository {
    async create(name, adminId) {

        //verryfing user 
        const user = await userModel.findById(adminId);
        if (!user) {
            throw new Error('NotFoundError: User found');
        }

        return await groupModel.create({ name, admin: user.id });

    }


    async changeName(id, name, groupId) {


        if (!name) {
            throw new Error('ValidationError: name is required');
        }

        const group = await groupModel.findById(groupId);
        if (!group) {
            throw new Error('NotFoundError: group not found');
        }

        const adminId = new mongoose.Types.ObjectId(id);

        if (group.admin.equals(adminId)) {

            group.name = name;
            await group.save();
        } else {
            throw new Error('UnauthorizedError: Only admin can change the group name');
        }
    }


    async deleteGroup(id, groupId) {
        const group = await groupModel.findById(groupId);
        if (!group) {
            throw new Error('NotFoundError: group not found');
        }
        const adminId = new mongoose.Types.ObjectId(id);

        if (group.admin.equals(adminId)) {
            await groupModel.findByIdAndDelete(groupId);
        } else {
            throw new Error('UnauthorizedError: Only admin can delete the group');
        }
    }


    async addUser(adminId, userId, groupId) {
        const group = await groupModel.findById(groupId);
        if (!group) {
            throw new Error('NotFoundError: group not found');
        }

        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('NotFoundError: user not found');
        }

        //checking user is already added or not 
        const result = group.participants.find(u => u == user.id);
        if (result) {
            throw new Error('AlreadyAddedError: user already added');
        }

        const adminObjectId = new mongoose.Types.ObjectId(adminId);

        if (group.admin.equals(adminObjectId)) {
            group.participants.push(user);
            await group.save();
        } else {
            throw new Error('UnauthorizedError: Only admin can add user to the group');
        }
        return;
    }



    async removeUser(adminId, userId, groupId) {
        const group = await groupModel.findById(groupId);
        if (!group) {
            throw new Error('NotFoundError: group not found');
        }

        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('NotFoundError: user not found');
        }

        const adminObjectId = new mongoose.Types.ObjectId(adminId);

        if (group.admin.equals(adminObjectId)) {
            group.participants = group.participants.filter(id => id !== userId);
            await group.save();
        } else {
            throw new Error('UnauthorizedError: Only admin can add user to the group');
        }
        return;
    }

    async findById(id) {
        return await groupModel.findById(id);
    }




}