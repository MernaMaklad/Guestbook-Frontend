import LocalStorage from "../utils/LocalStorage";

export default class MessagesService {
    static instance;

    constructor() {
        if (MessagesService.instance) {
            return MessagesService.instance;
        }
        this.instance = this;
        return this;
    }
    async getMessages() {
        return await (await fetch("/message", {
            method: "GET",
            mode: 'cors',
            headers: {
                token: new LocalStorage().getUser().token
            }
        })).json();
    }

    async getMessageById(id) {
        return await (await fetch("/message/" + id, {
            method: "GET",
            mode: 'cors',
            headers: {
                token: new LocalStorage().getUser().token
            }
        })).json();
    }

    async createMessage({ message, userId }) {
        return await (await fetch("/message", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                token: new LocalStorage().getUser().token
            },
            body: JSON.stringify({
                message,
                userId,
                receiverId:'5ebc07beaa055e7d9c6bba15'
            })
        })).json();
    }

    async updateMessage(messageId, message) {
        return await (await fetch("/message/" + messageId, {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                token: new LocalStorage().getUser().token
            },
            body: JSON.stringify({
                message
            })
        })).json();
    }
    async removeMessage(messageId) {
        return await (await fetch("/message/" + messageId, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                token: new LocalStorage().getUser().token
            }
        })).json();
    }

    async replyToMessage( messageId,  reply ) {
        
        return await (await fetch(`/message/${messageId}/reply` ,{
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                token: new LocalStorage().getUser().token
            },
            body: JSON.stringify({
                reply
            })
        })).json();
    }


}