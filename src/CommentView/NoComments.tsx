import React from 'react';
import { IoChatboxEllipses } from 'react-icons/io5'; 
import './css/NoComments.css';

function NoComments() {
    return (
        <div className="noComment">
            <IoChatboxEllipses />
            <h4>No comments yet</h4>
            <p>Please paste or upload your message</p>
        </div>
    );
}

export default NoComments;