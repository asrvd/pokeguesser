import { db } from "@/lib/db";
import { pokemon } from "@/lib/db/schema";
import Image from "next/image";

async function getCaughtPokemon() {
  const caughtPokemon = await db.select().from(pokemon);

  return caughtPokemon;
}

export default async function MyTeam() {
  const caughtPokemon = await getCaughtPokemon();

  return (
    <div className="flex flex-col justify-center gap-8 items-center">
      <h1 className="text-4xl font-bold text-balance">Your Pokémon Team</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-4 max-h-full overflow-y-auto">
        {caughtPokemon.map((pokemon) => (
          <div key={pokemon.id}
            className="border border-zinc-500 p-2"
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              width={150}
              height={150}
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
