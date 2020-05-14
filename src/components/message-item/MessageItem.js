import React from 'react';
import './MessageItem.css';

export default class MessageItem extends React.Component {
    

    constructor(props)
    {
        super(props)
    }
    

    
    render() {
      return(
        <div className="card" onClick={this.props.onCardClick}>
            <div className="container">
                <img src={"https://www.w3schools.com/howto/img_avatar.png"} alt="Avatar" className="avatar"/>
                <div>
                    <p style={{fontSize: 20}}>{this.props.name}</p>
                    <p>{this.props.message}</p>
                    <small>{this.props.timestamp}</small>
                </div>

            </div>
        </div>
      );
    }
}