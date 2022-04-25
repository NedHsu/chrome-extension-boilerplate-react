import React from 'react';
import './ToolButton.css';

const ToolButton = () => {
    const click = () => {
        console.log('ToolButton');
        window.getSelection().empty();
    };
    return (
        <div className='tool-button' onClick={click}>
            Abc
        </div>
    )
};

export default ToolButton;