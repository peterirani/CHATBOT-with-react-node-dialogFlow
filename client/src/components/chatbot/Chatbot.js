import React, {Component} from "react";
import axios from "axios/index";
import {v4 as uuid} from 'uuid';
import Cookies from "universal-cookie";

import Message from "./Message";
import Card from "./Card";

const cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;
    inputAutoFocus;
    constructor(props) {
        super(props);

        this.state = {
            messages : [],
        };
        //binding methods
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
        this.renderSingleMessage = this.renderSingleMessage(this);

        //setting up cookies
        if (cookies.get("userID") === undefined) {
            cookies.set('userID', uuid(), {path : "/"})
        }
    }

    componentDidMount() {
        this.df_event_query('welcome').then(r => null);
        //console.log(cookies.get("userID"));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollIntoView({behavior : "smooth"});
        this.inputAutoFocus.focus();
    }

    async df_text_query(queryText){
        let says = {
            speaks : "me",
            msg : {
                text : {
                    text : queryText
                }
            }
        };
        this.setState({messages: [...this.state.messages, says]});
        // we are pulling the value of `text` from the returned JSON
        const res = await axios.post('/api/df_text_query', {text : queryText,  userID: cookies.get("userID")});
        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            let says = {
                speaks : "R-bot",
                msg : msg
                };
            this.setState({messages: [...this.state.messages, says]})
        }
    }


    async df_event_query(event){
        console.log("EVENT QUERY IS TRIGGERED!!");
        const res = await axios.post("/api/df_event_query", {event, userID: cookies.get("userID")});
        console.log(event);
        console.log(res);
        for (let msg of res.data.fulfillmentMessages) {
            console.log(msg);
            let says = {
                speaks : "R-bot",
                msg : msg
            };
            this.setState({messages: [...this.state.messages, says]})
        }
    }

    renderCards(cards){
        return cards.map((card,i) => {
            return <Card key={i} payload={card.structValue} />
        })
    }

    renderSingleMessage(message, i) {
        if(message.msg && message.msg.text && message.msg.text.text){
            return <Message speaks={message.speaks} text={message.msg.text.text} key={i}/>
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {
            return (<div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow:"hidden"}}>
                        <div className="col s2">
                            <button className="btn-floating btn-large waves-effect waves-light teal accent-4">{message.speaks}</button>
                        </div>

                        <div style={{overflow:"auto", overflowY:"scroll"}}>
                            <div style={{height:300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(this.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        } else  {
            return <h1>CARDS</h1>
        }
    }

    renderMessages(stateMessages) {
        if (stateMessages){
            return stateMessages.map((message,i) => this.renderSingleMessage(message,i))
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        // don't forget to bind this method to the constructor of chatbox

        if (e.key === "Enter"){
            this.df_text_query(e.target.value).then(r => console.log("user's text is sent to chat box"));

            // resetting the target value as an empty string
            e.target.value = "";
        }
    }


    render() {
        return(
            <div style={{height:400, width:400,float:"right"}}>
                <div id={"chatbot"} style={{height:"100%", width:"100%", overflow:"auto"}}>
                    <h2>Chatbot</h2>
                    {this.renderMessages(this.state.messages)}
                    <div
                        //reference tag for smooth scrolling
                        ref={(el) => this.messagesEnd = el}
                        style={{float:"left", clear:"both"}}
                    >
                    </div>
                    <input
                        type="text"
                        onKeyPress={this._handleInputKeyPress}
                        ref={(el) => this.inputAutoFocus = el}
                    />
                </div>
            </div>
        )
    }
}

export default Chatbot;