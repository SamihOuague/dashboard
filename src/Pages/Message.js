import React, { Component } from "react";

class Message extends Component {
    render() {
        return(
            <section className="message">
                <h2><i className="fas fa-envelope" style={{margin: "0 16px"}}></i>Messages</h2>
                <div className="message__container">
                    <div className="message__container__msg">
                        <h2>NOM Prenom</h2>
                        <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Message;