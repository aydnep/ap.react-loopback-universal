import React from 'react';
import { Link } from 'react-router';
import logo from '../../img/main/logo.svg';
import './main.css';

const Main = () => {
  return (
    <div className="ap-react-app main">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <form action="/auth/local" method="post">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" />
      </form>
      <Link to="/qwerty">qwerty</Link>
    </div>
  );
};

export default Main;
