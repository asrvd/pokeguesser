import Image from "next/image";
import Guesser from "@/components/Guesser";
import { db } from "@/lib/db";
import { pokemon } from "@/lib/db/schema";

async function fetchRandomPokemon() {
  // the random pokemon should not be one that has already been caught
  const caughtPokemons = await db.select().from(pokemon);

  const caughtPokemonIDs = caughtPokemons.map((pokemon) => pokemon.id);
  let randomPokemonID;

  do {
    randomPokemonID = Math.floor(Math.random() * 898) + 1;
  } while (caughtPokemonIDs.includes(randomPokemonID));

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemonID}`
  );
  const randomPokemon = await response.json();

  return {
    id: randomPokemon.id,
    name: randomPokemon.name,
    type: randomPokemon.types[0].type.name,
  };
}

export default async function Home() {
  const pokemon = await fetchRandomPokemon();
  return (
    <>
      <h1 className="text-4xl font-bold text-balance">
        Catch&apos;em all! Can you guess this Pokémon?
      </h1>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt="A random Pokémon"
        width={300}
        height={300}
      />
      {pokemon && <Guesser pokemon={pokemon} />}
    </>
  );
}
