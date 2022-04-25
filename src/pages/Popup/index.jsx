import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { Provider } from 'react-redux';
import store from '../../store';
import * as slice from '../../store/popupSlice';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (slice[request.actionType]) {
        store.dispatch(slice[request.actionType](...request.data))
    } else if (slice.actions[request.actionType]) {
        store.dispatch(slice.actions[request.actionType](...request.data))
    }
    sendResponse();
});

render(
    <Provider store={store}>
        <Popup />
    </Provider>
    , window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
