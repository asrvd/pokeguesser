"use server";

import { db } from "@/lib/db";
import { pokemon } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

type Pokemon = typeof pokemon.$inferInsert;

export default async function catchPokemon({
  guessedPokemon,
}: {
  guessedPokemon: Pokemon;
}) {
  const caughtPokemon = await db.insert(pokemon).values(guessedPokemon);

  revalidatePath("/");

  return caughtPokemon;
}
