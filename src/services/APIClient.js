import MessagesService from "./MessagesService";
import AuthService from "./AuthService";

export default class APIClient 
{
    messagesService = new MessagesService();
    authService = new AuthService();
    static baseUrl = "http://localhost:3000/";
    static instance;

    constructor(){
        if(APIClient.instance){
            return APIClient.instance;
        }
        this.instance = this;
        return this;
    }


    getMessagesService(){
        return this.messagesService;
    }

    getAuthService()
    {
        return this.authService;
    }


}