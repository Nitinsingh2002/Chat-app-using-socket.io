import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        // Participants: Sender and Receivers
        participants: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: true,
        },

        // Messages within the chat
        messages: [
            {
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                content: {
                    type: String,
                    required: true
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                },
            },
        ],

        // Group-related fields (optional for one-to-one chats)
        isGroupChat: {
            type: Boolean,
            default: false, // Default: Single chat
        },
        groupName: {
            type: String,
            default: null, // Only relevant for group chats
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    }, {
    timestamps: true
}
);

const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel;
