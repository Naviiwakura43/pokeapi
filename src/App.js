// src/App.js

import React from 'react';
import './App.css';
import PokemonInfo from './Pokemoninfo.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PokeAPI en React</h1>
        <PokemonInfo />
      </header>
    </div>
  );
}

export default App;

