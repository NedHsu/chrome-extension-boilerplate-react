import React from 'react';
import { useSelector } from 'react-redux';
import './Popup.css';
import store from '../../store';
import { reloadRecentWords } from '../../store/popupSlice';
import AuthService from '../../auth/authService';

store.dispatch(reloadRecentWords())

const login = () => {
  console.log(chrome.identity.getRedirectURL());
  // chrome.tabs.create({
  //   url: 'login.html'
  // });
  chrome.windows.create({
    url: 'login.html'
  });
}

const checkLogin = () => {
  console.log(AuthService.isLoggedIn());
}

const Popup = () => {
  const recentWords = useSelector((state) => state.popup.recentWords, (a, b) => a.length === b.length);
  console.log(recentWords);
  const rows = recentWords?.map((x, i) => {
    return (
      <div key={i}>
        {x}
      </div>
    )
  })

  return (
    <div className="App">
      <header className="App-header">
        {rows}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <button onClick={(login)}>Login</button>
        <button onClick={(checkLogin)}>Check Login</button>
      </header>
    </div>
  );
};

export default Popup;
