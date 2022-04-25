import React from 'react';
import { render } from 'react-dom';

import Login from './Login';
import './index.css';
import AuthService from '../../auth/authService';
import { UserManager, WebStorageStateStore } from "oidc-client";

var config = {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    response_mode: "query",
};
var mgr = new UserManager(config);

if (window.location.search.includes("?redirect=true")) {
    mgr.signinRedirectCallback().then(
        () => {
            window.history.replaceState(
                {},
                window.document.title,
                window.location.origin
            );

            let returnUrl = localStorage.getItem("returnUrl");
            if (returnUrl) {
                localStorage.removeItem("returnUrl");
            } else {
                returnUrl = "/";
            }
            // store.dispatch(sendMessageAsync(''))
            console.log('test')
        },
        (error) => {
            console.error(error);
        }
    );
} else {
    AuthService.login('');
}

render(<Login />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
