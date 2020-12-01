import React from 'react';
import './Header.css';
import { IoChatboxEllipses } from 'react-icons/io5'; 

function Header() {
    return (
        <div className="header">
            <span><IoChatboxEllipses /></span>
            <h1>Intently</h1>
        </div>
    );
}

export default Header;