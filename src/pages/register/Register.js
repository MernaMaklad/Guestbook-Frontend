import React from 'react';
import './Register.css';
import APIClient from '../../services/APIClient';
import LocalStorage from '../../utils/LocalStorage';

export default class RegisterPage extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            email: "",
            name:"",
            password: "",
            isOwner:false,
            textDisplay:"Not an Owner"
        }
    }
    
    async onRegisterButtonClick()
    {
        if(!this.state.email || this.state.email === "" || !this.state.password || this.state.password === "" || !this.state.name || this.state.name === "")
        {
            alert("Please fill in all data");
            return;
        }
        const user = await new APIClient().getAuthService().register({email: this.state.email, password: this.state.password, name: this.state.name, isOwner: this.state.isOwner})
        new LocalStorage().saveUser({_id: user.data._id, name: user.data.name, token: user.token});

        this.props.history.push("/messages");
    }

    onEmailChange(value)
    {
        this.setState({
            email: value
        })
    }
    onNameChange(value)
    {
        this.setState({
            name: value
        })
    }

    onPasswordChange(value)
    {
        this.setState({
            password: value
        })
    }
    ToggleButton(){
        if(this.state.isOwner){
            this.setState({
                isOwner: false,
                textDisplay:"Not An Owner"
            });
        }else{
            this.setState({
                isOwner: true,
                textDisplay:"Owner"
            });
        }
    }
    render() {
      return(
        <div className="main-container">
            <h1>Register</h1>
            <div className="form-container">
                <div className="input-field-container">
                    <p className="input-label">Email</p>
                    <input className="input-field" type="email" placeholder="Enter your email" value={this.state.email} onChange={(event) => this.onEmailChange(event.target.value)} />
                </div>

                <div className="input-field-container">
                    <p className="input-label">Name</p>
                    <input className="input-field" type="name" placeholder="Enter your Name" value={this.state.name} onChange={(event) => this.onNameChange(event.target.value)} />
                </div>

                <div className="input-field-container">
                    <p className="input-label">Password</p>
                    <input className="input-field" type="password" placeholder="Enter your password" value={this.state.password} onChange={(event) => this.onPasswordChange(event.target.value)} />
                </div>
                <input disabled id="standard-disabled" value={this.state.textDisplay} />
                <button onClick={() => this.ToggleButton()}>
                  Owner
                </button><br/>
                <button onClick={() => this.onRegisterButtonClick()} className="register-button">Register</button>

            </div>
        </div>
      );
    }
}