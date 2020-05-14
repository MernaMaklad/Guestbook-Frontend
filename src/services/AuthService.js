import LocalStorage from "../utils/LocalStorage";

export default class AuthService 
{
    static instance;
    
    constructor(){
        if(AuthService.instance){
            return AuthService.instance;
        }
        this.instance = this;
        return this;
    }

    async login({ email, password }) {
        const response = await fetch("user/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email,
                password
            })
        })
        return await response.json()
    }

    async register({email, password, name, isOwner})
    {
        return await (await fetch("user/register", 
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({email, password, name, isOwner})
            })).json();
    }

    
}