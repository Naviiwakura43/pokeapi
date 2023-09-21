import React from 'react';
import './App.css';
import PokemonInfo from './Pokemoninfo'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>My Pokemon App</h1>
        <Routes>
          <Route path="/" element={<PokemonInfo />} />
          {}
        </Routes>
      </div>
    </Router>
  );
}


export default App;

