import React from 'react';
import './App.css';
import { GistsComponent } from './components/gistsComponent'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gist Finder</h1>
      </header>
      <GistsComponent />
    </div>
  );
}

export default App;
