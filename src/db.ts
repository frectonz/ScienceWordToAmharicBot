import { readFileSync } from "fs";

interface Word {
  word: string;
  translation: string;
}

export function getWords(): Word[] {
  const words: Word[] = JSON.parse(readFileSync("data/dict.json", "utf8")).map(
    (word: any) => {
      return { word: word.word, translation: word.tr.amh } as Word;
    }
  );

  return words;
}
