import React, { useState, useEffect } from "react";
import axios from "axios";

function Pokemon() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  useEffect(() => {
    if (pokemonName && pokemonChosen) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => {
          setPokemon({
            name: pokemonName,
            species: response.data.species.name,
            img: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pokemonName, pokemonChosen]);

  const handleSearch = () => {
    if (pokemonName) {
      setPokemonChosen(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Search for your Pokemon</h1>
      <div className="flex items-center justify-center">
        <input
          type="text"
          className="border-2 border-gray-400 rounded-md px-4 py-2 mr-4"
          onChange={(event) => setPokemonName(event.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md px-4 py-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {pokemonChosen ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
          {pokemon.img ? (
            <img
              src={pokemon.img}
              alt="picture of pokemon"
              className="mb-4 rounded-md"
            />
          ) : (
            <p>Loading image...</p>
          )}
          <h3 className="text-lg font-semibold">species: {pokemon.species}</h3>
          <h4 className="text-md font-medium">HP: {pokemon.hp}</h4>
          <h4 className="text-md font-medium">Attack: {pokemon.attack}</h4>
          <h4 className="text-md font-medium">Defense: {pokemon.defense}</h4>
          <h4 className="text-md font-medium">Type: {pokemon.type}</h4>
        </div>
      ) : (
        <h1 className="text-2xl font-bold mt-8">Please choose a Pokemon</h1>
      )}
    </div>
  );
}

export default Pokemon;
