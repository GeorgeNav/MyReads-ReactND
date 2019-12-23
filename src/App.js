import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Header from 'components/Header/Header'
import Main from 'components/Main/Main'
import './App.css';

class App extends Component {
  render() {
    return (<div>
      <Header />
      <Main />
    </div>);
  }
}

export default App;
