import { GroupRepository } from "./group.repository.js"

export class GroupController {
    constructor() {
        this.GroupRepository = new GroupRepository()
    }



    async create(req, res, next) {
        try {
            const { name } = req.body;
            const adminId = req.id;
            console.log('id is ', adminId);
            await this.GroupRepository.create(name, adminId);
            return res.status(201).json({ message: 'Group created successfully' });
        } catch (error) {

            console.log(error.message);
            if (error.message.startsWith('NotFoundError:')) {
                return res.status(409).json({ error: error.message.replace('NotFoundError: ', '') });
            }
            return res.status(500).json({ error: 'Internal server error'})
        }
    }


    async changename(req, res, next) {
        try {
            const id = req.id;
            const { name, groupId } = req.body;
            await this.GroupRepository.changeName(id, name, groupId);
            return res.status(200).json({ message: 'Group name updated successfully' });
        } catch (error) {


            console.log(error)
            if (error.message.startsWith('ValidationError:')) {
                return res.status(400).json({ error: error.message.replace('ValidationError: ', '') });
            }

            if (error.message.startsWith('NotFoundError:')) {
                return res.status(409).json({ error: error.message.replace('NotFoundError: ', '') });
            }

            if (error.message.startsWith('UnauthorizedError:')) {
                return res.status(409).json({ error: error.message.replace('UnauthorizedError: ', '') });
            }

            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const id = req.id;
            const { groupId } = req.body;
            await this.GroupRepository.deleteGroup(id, groupId);
            return res.status(200).json({ message: 'Group deleted successfully' });
        } catch (error) {

            if (error.message.startsWith('NotFoundError:')) {
                return res.status(409).json({ error: error.message.replace('NotFoundError: ', '') });
            }
            if (error.message.startsWith('UnauthorizedError:')) {
                return res.status(400).json({ error: error.message.replace('UnauthorizedError: ', '') });
            }
            return res.status(500).json({ error: 'Internal server error' })
        }

    }


    async addUser(req, res, next) {
        try {
            const adminId = req.id;
            const { userId, groupId } = req.body;
            await this.GroupRepository.addUser(adminId, userId, groupId);
            return res.status(200).json({ message: 'User added to the group successfully' });

        } catch (error) {
            if (error.message.startsWith('AlreadyAddedError:')) {
                return res.status(409).json({ error: error.message.replace('AlreadyAddedError: ', '') });
            }
        
            console.log(error);

            if (error.message.startsWith('NotFoundError:')) {
                return res.status(409).json({ error: error.message.replace('NotFoundError: ', '') });
            }
            if (error.message.startsWith('UnauthorizedError:')) {
                return res.status(400).json({ error: error.message.replace('UnauthorizedError: ', '') });
            }
            return res.status(500).json({ error: 'Internal server error' })
        }
    }


    async removeUser(req, res, next) {
        try {
            const adminId = req.id;
            const { userId, groupId } = req.body;
            await this.GroupRepository.removeUser(adminId, userId, groupId);
            return res.status(200).json({ message: 'User removed from group sucessfully' });

        } catch (error) {
            
            if (error.message.startsWith('NotFoundError:')) {
                return res.status(409).json({ error: error.message.replace('NotFoundError: ', '') });
            }
            if (error.message.startsWith('UnauthorizedError:')) {
                return res.status(400).json({ error: error.message.replace('UnauthorizedError: ', '') });
            }
            return res.status(500).json({ error: 'Internal server error' })
        }
    }


    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const group = await this.GroupRepository.findById(id);
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            return res.status(200).json(group);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }



}