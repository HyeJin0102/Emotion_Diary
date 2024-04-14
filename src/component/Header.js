import React from 'react'
import "./Header.css";

const Header = ({ title, leftChild, rightChild }) => {
    return (
        <div className="Header">
            <div className='headerLeft'>{leftChild}</div>
            <div className='headerTitle'>{title}</div>
            <div className='headerRight'>{rightChild}</div>
        </div>
    );
};

export default Header