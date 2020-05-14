import React from 'react';
import './Login.css';
import APIClient from '../../services/APIClient';
import LocalStorage from '../../utils/LocalStorage';

export default class LoginPage extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    
    async onLoginButtonClick()
    {
        if(!this.state.email || this.state.email === "" || !this.state.password || this.state.password === "")
        {
            alert("Please fill in all data");
            return;
        }

        const user = await new APIClient().getAuthService().login({email: this.state.email, password: this.state.password})

        new LocalStorage().saveUser({_id: user.data._id, name: user.data.name, token: user.token});

        this.props.history.push("/messages");
    }

    onEmailChange(value)
    {
        this.setState({
            email: value
        })
    }

    onPasswordChange(value)
    {
        this.setState({
            password: value
        })
    }
    
    render() {
      return(
        <div className="main-container">
            <h1>Login</h1>
            <div className="form-container">
                <div className="input-field-container">
                    <p className="input-label">Email</p>
                    <input className="input-field" type="email" placeholder="Enter your email" value={this.state.email} onChange={(event) => this.onEmailChange(event.target.value)} />
                </div>

                <div className="input-field-container">
                    <p className="input-label">Password</p>
                    <input className="input-field" type="password" placeholder="Enter your password" value={this.state.password} onChange={(event) => this.onPasswordChange(event.target.value)} />
                </div>
                <button onClick={() => this.onLoginButtonClick()} className="login-button">Login</button>

            </div>
        </div>
      );
    }
}