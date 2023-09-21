import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonInfo() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState('pikachu'); // Nombre del Pokémon a consultar

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      setPokemonData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del Pokémon:', error);
      });
  }, [pokemonName]);

  return (
    <div>
      <h1>POKE API</h1>
      {pokemonData && (
        <div>
          <p>Nombre: {pokemonData.name}</p>
          <p>ID: {pokemonData.id}</p>
          <p>Altura: {pokemonData.height}</p>
          <p>Peso: {pokemonData.weight}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonInfo;