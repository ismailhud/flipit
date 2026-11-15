import type { Deck } from "@/types";
import { decks } from "./decks";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const many: Deck[] = Array.from({ length: 200 }, (_, i) => ({
  ...decks[i % decks.length],
  id: String(i + 1),
}));

export async function fetchDecks(
  options: { fail?: boolean } = {},
): Promise<Deck[]> {
  await wait(800);
  if (options.fail) throw new Error("Could not load decks");
  return many;
}
