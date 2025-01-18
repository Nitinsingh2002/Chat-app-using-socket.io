import ChatRepository from "./chat.repository.js";

export default class ChatController {
    constructor(){
        this.ChatRepository = new ChatRepository();
    }
}