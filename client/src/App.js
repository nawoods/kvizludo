import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import QuestionList from './components/QuestionList';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <QuestionList />
    </div>
  );
}

export default App;
