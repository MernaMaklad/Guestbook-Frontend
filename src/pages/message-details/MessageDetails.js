import React from 'react';
import './MessageDetails.css';
import APIClient from '../../services/APIClient';
import LocalStorage from '../../utils/LocalStorage';

/**
 * This page should edit/delete messages.
 */
export default class MessageDetailsPage extends React.Component {
    

    constructor(props) {
        super(props)
        const { params } = this.props.match; //Route params :id
        this.params = params;
        //Add other attributes here
        this.state = {
            "message": {
                "data": {
                  "_id": "",
                  "message": "message text",
                  "userId": {
                    "name": "Username"
                  }
                }
              },
            showDeleteButton: false,
            showEditButton: false,
            showReplyButton:false,
            disabled:false
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleReplyClick = this.handleReplyClick.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    async componentDidMount() {
        const message = await (new APIClient().getMessagesService().getMessageById(this.params.id))
        const user = new LocalStorage().getUser();
        
        
        this.setState({
            message,
            showDeleteButton: user._id === message.data.userId._id ? true: false,
            showEditButton: user._id === message.data.userId._id? true: false,
            showReplyButton: user._id === message.data.receiverId && message.data.reply == ""? true: false,
            disabled: user._id === message.data.userId._id? false: true
        })
    }
    async handleEditClick (){
        const value = this.nameTextInput.value
        if (value !== null) {
            await (new APIClient().getMessagesService().updateMessage(this.params.id, value))
            
            this.props.history.push("/messages");
        }
        return;
      }
      async handleReplyClick (){
        const value = this.replyText.value
        if (value !== null) {
          await (new APIClient().getMessagesService().replyToMessage(this.params.id, value))
          
          this.props.history.push("/messages");
      }
      return;
      }
      async deleteMessage (){
        await (new APIClient().getMessagesService().removeMessage(this.params.id))
        
        this.props.history.push("/messages");
        return;
      }
    showDeleteButton() {
        if(this.state.showDeleteButton)
        {
            return <button type="button" className="btn btn-danger" onClick={this.deleteMessage}>Delete</button>
        }
        return null;
    }
    showEditButton() {
        if(this.state.showEditButton)
        {
            return <button type="button" className="btn btn-success" onClick={this.handleEditClick}>Update</button>
        }
        return null;
    }
    showReplyButton(){
      if(this.state.showReplyButton)
      {
          return <button type="button" className="btn btn-success" onClick={this.handleReplyClick}>Reply</button>
      }
      return null;
    }
    render() {
      return(
        <div className="main-container">
            <h2>Message Details: {this.state.message.data.userId.name} </h2>
            <div className="message-container" >
              {this.showDeleteButton()}
              <input className="message-input" type="text" disabled={this.state.disabled} placeholder={this.state.message.data.message} ref={(ref) => this.nameTextInput = ref} style={{width: "370px"}} />
              {this.showEditButton()}
            </div>
            <div className="reply-container" >
                <h3>Replies</h3>
              <input className="message-input" type="text" disabled ={!this.state.showReplyButton} placeholder={this.state.message.data.reply} ref={(ref) => this.replyText = ref} style={{width: "370px"}}  />
              {this.showReplyButton()}
            </div>
        </div>
      );
    }
}