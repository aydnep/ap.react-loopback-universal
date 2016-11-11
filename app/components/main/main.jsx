import React from 'react';
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
    </div>
  );
};

export default Main;
