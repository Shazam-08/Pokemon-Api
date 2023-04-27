import React, { useState } from "react";
import axios from "axios";
function Pokemon() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonchosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
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
        setPokemonChosen(true);
      });
  };

  return (
    <div>
      <div>
        <h1>Search for your Pokemon</h1>
        <input
          type="text"
          onChange={(event) => setPokemonName(event.target.value)}
        />
        <div>
          <button onClick={searchPokemon}>Search</button>
        </div>
        <div>
          {!pokemonchosen ? (
            <h1>Please choose a Pokemon</h1>
          ) : (
            <>
              <h1>{pokemon.name}</h1>
              <img src={pokemon.img} alt="picture of pokemon" />
              <h3>species: {pokemon.species}</h3>
              <h4>HP: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
              <h4>Type: {pokemon.type}</h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
