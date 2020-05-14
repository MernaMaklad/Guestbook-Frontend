import React from 'react';
import './Messages.css';
import MessageItem from '../../components/message-item/MessageItem';
import APIClient from '../../services/APIClient';

export default class MessagesPage extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            messages: []
        }}

    async componentDidMount() {
        console.log("Component Mounted")
        const messages = await (new APIClient().getMessagesService().getMessages());
        this.setState({messages : messages.data})
    }

    onSubmitButtonClick(){
        this.props.history.push(`/submit`);
    }
    onCardClick(id) {
        this.props.history.push(`/messages/${id}`);
    }

    renderMessages(){
        const messages = this.state.messages;
        return messages.map(m =><MessageItem 
            key={m._id} 
            name={m.userId.name} 
            message={m.message}
            timestamp={m.timestamp} 
            avatar={null}
            onCardClick={() => this.onCardClick(m._id) } 
        />);
    }

    
    render() {
      return(
        <div className="main-container">
            <h2>Messages</h2>
            <button onClick={() => this.onSubmitButtonClick()} className="submit-button">Add Your Message</button>
            <div className="messages-container" >
                {this.renderMessages()}
            </div>
        </div>
      );
    }
}