import React from "react";

function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.name}>
          <img src={p.image} alt={p.name} />
          <div>{p.name}</div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
