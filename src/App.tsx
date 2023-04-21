import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GistsComponent } from './components/gistsComponent'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <GistsComponent />
    </div>
  );
}

export default App;
