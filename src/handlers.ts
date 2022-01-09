import { getWords } from "./db";
const words = getWords();

export function handleStart(username: string): string {
  return `Hi, ${username}.\nIf you want to search for the translation of a word, send it as a message.\nOr get a random word translation with /random`;
}

export function handleRandomWord(): string {
  const randomWord = words[Math.floor(Math.random() * words.length)];

  return `<b>${randomWord.word}</b> => <b>${randomWord.translation}</b>`;
}

export function handleAbout(): string {
  return "This bot was created by Fraol Lemecha. All the code and dictionary data can be found <a href='https://github.com/fraol0912/ScienceWordToAmharicBot'>here</a>";
}

export function handleSearch(searchWord: string): string {
  searchWord = searchWord.trim();

  console.log("[SEARCH_WORD]:", searchWord);

  const foundWords = words.filter(({ word }) =>
    word.toLowerCase().includes(searchWord.toLowerCase())
  );
  foundWords.splice(30);

  console.log("[FOUND_WORD]:", foundWords);

  if (foundWords.length === 0) {
    return `No translation found for <b>${searchWord}</b>`;
  } else {
    let message = foundWords
      .map((word, i) => `${i + 1}, ${word.word} => ${word.translation}`)
      .join("\n");

    return `<b>Translations</b>\n${message}`;
  }
}
