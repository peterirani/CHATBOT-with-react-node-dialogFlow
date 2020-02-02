import React from "react";

const Card = (props) => {
    return (
        <div style={{width:270, paddingRight:30, height:270 }}>
            <div className="card">
                <div className="card-image" style={{width:240}}>
                    <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
                        <span className="card-title">{props.payload.fields.header.stringValue}</span>
                </div>
                <div className="card-content">
                    <p>{props.payload.fields.description.stringValue}</p>
                    <p><a href={props.payload.fields.link.stringValue}>{props.payload.fields.price.stringValue}</a></p>
                </div>
                <div className="card-action">
                    <a href={props.payload.fields.link.stringValue}>Get Now!</a>
                </div>
            </div>
        </div>
    )
};

export default Card;