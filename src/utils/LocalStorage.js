export default class LocalStorage 
{
    static USER_KEY = "USER";
    static instance;

    constructor(){
        if(LocalStorage.instance){
            return LocalStorage.instance;
        }
        this.instance = this;
        return this;
    }

    saveUser({name, _id, token})
    {
        window.sessionStorage.setItem(LocalStorage.USER_KEY, JSON.stringify({name, _id, token}));
    }


    getUser()
    {
        return JSON.parse(window.sessionStorage.getItem(LocalStorage.USER_KEY));
    }

    removeUser()
    {
        window.sessionStorage.removeItem(LocalStorage.USER_KEY);
    }




}