import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },


        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },


        participants: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: true,
        },


        createdAt: {
            type: Date,
            default: Date.now,
        },
    }

);

const groupModel = new mongoose.model('Group',groupSchema);

export default groupModel;
