import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function PokemonInfo() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPokemonList = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Error al obtener la lista de Pokémon:', error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [fetchPokemonList, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const searchPokemon = async () => {
      if (searchQuery) {
        setIsLoading(true);
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
          const allPokemon = response.data.results;
          const filteredPokemonList = allPokemon.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setPokemonList(filteredPokemonList);
        } catch (error) {
          console.error('Error al buscar Pokémon:', error);
        }
        setIsLoading(false);
      } else {
        
        fetchPokemonList(currentPage);
      }
    };

    searchPokemon();
  }, [searchQuery, currentPage, fetchPokemonList]);

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ul>
            {pokemonList.map((pokemon, index) => (
              <li key={index}>{pokemon.name}</li>
            ))}
          </ul>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Página anterior</button>
          <button onClick={handleNextPage}>Página siguiente</button>
        </>
      )}
    </div>
  );
}

export default PokemonInfo;
