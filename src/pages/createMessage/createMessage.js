import React from 'react';
import './createMessage.css';
import APIClient from '../../services/APIClient';
import LocalStorage from '../../utils/LocalStorage';

export default class CreateMessagePage extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            message: ""
        }
    }
    
    async onSubmitButtonClick()
    {
        if(!this.state.message || this.state.message === "" )
        {
            alert("Please fill in a message");
            return;
        }
        const user = new LocalStorage().getUser();
        await new APIClient().getMessagesService().createMessage({userId: user._id, message: this.state.message})
        
        this.props.history.push("/messages");
    }

    onMessageChange(value)
    {
        this.setState({
            message: value
        })
    }

    
    render() {
      return(
        <div className="main-container">
            <h1>Submit Message</h1>
            <div className="form-container">
                <div className="input-field-container">
                    <p className="input-label">Message</p>
                    <input className="input-field" type="text" placeholder="Enter your Message" value={this.state.message} onChange={(event) => this.onMessageChange(event.target.value)} />
                </div>
                <button onClick={() => this.onSubmitButtonClick()} className="submit-button">Submit</button>

            </div>
        </div>
      );
    }
}