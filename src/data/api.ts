import type { Deck } from "@/types";
import { decks } from "./decks";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchDecks(
  options: { fail?: boolean } = {},
): Promise<Deck[]> {
  await wait(800);
  if (options.fail) throw new Error("Could not load decks");
  return decks;
}

export function getDeck(id: string): Deck | undefined {
  return decks.find((deck) => deck.id === id);
}