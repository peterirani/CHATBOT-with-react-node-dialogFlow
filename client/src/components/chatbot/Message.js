import React from "react";

const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.speaks === "R-bot" && <div className="col s2">
                        <button className="btn-floating btn-large waves-effect waves-light teal accent-4">{props.speaks}</button>
                    </div>}

                    <div className="col s10">
                        <span className="black-text">
                            {props.text}
                        </span>
                    </div>

                    {props.speaks === "me" && <div className="col s2">
                        <button className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</button>
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default Message;