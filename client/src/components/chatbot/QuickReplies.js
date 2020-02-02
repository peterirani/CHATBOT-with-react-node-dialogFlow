import React, {Component} from "react";
import QuickReply from "./QuickReply";

class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event, payload, text){
        this.props.replyClick(event,payload,text)
    }

    render(){
        return(
            <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="row valign-wrapper">

                </div>
            </div>
        )
    }
}

export default QuickReplies;