import React from "react";
import { MdSentimentSatisfied } from "react-icons/md";
import { Sentence } from "../models/SentimentRequest";
import "./css/Comment.css";

class Comment extends React.Component<{sentence: Sentence}, {}> {

    render() {
        return (
            <div className={`comment ${this.props.sentence.sentiment.type.toLowerCase()}`}>
                <div className="comment-header">
                    <span>{this.props.sentence.sentiment.type.toUpperCase()}</span>
                    <i><MdSentimentSatisfied/></i>
                </div>
                <div className="comment-body">
                    <p>{this.props.sentence.sentence}</p>
                    <i>{this.props.sentence.author}</i>
                </div>
            </div>
        );
    }
}

export default Comment