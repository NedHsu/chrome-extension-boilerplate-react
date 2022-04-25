import { printLine } from './modules/print';
import store from '../../store'
import { recordWordAsync } from '../../store/popupSlice'
import React from 'react';
import { render } from 'react-dom';
import ToolButton from './ToolButton'

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

let container;
document.addEventListener('mouseup', (e) => {
    const selection = document.getSelection().toString();
    if (selection) {
        store.dispatch(recordWordAsync(selection));
        if (!container) {
            container = document.body.appendChild(document.createElement('div'));
            console.log(e);
            container.style = `position: absolute; left: ${e.pageX}px;top: ${e.pageY}px`;
            render(<ToolButton />, container);
        }
    }
});

document.addEventListener('mousedown', (e) => {
    if (container) {
        container.remove();
        container = null;
    }
});