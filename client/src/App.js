import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import QuestionList from './components/QuestionList';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = (email, password) => {
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          this.setState({
            token: res.token,
            user: res.user,
            error: undefined
          });

        } else {
          this.setState({
            token: undefined,
            user: undefined,
            error: res.msg
          });
        }
      });
  }

  render () {
    return (
      <div className="App">
        <AppNavbar 
          login={this.login} 
          user={this.state.user} 
          error={this.state.error} 
        />
        <QuestionList />
      </div>
    );
  }
}

export default App;
