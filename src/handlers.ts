import { getWords } from "./db";
const words = getWords();

export function handleStart(username: string): string {
  return `Hi, ${username}.\nIf you want to search for the translation of a word, send it as a message.\nOr get a random word translation with /random`;
}

export function handleRandomWord(): string {
  const randomWord = words[Math.floor(Math.random() * words.length)];

  return `<b>${randomWord.word}</b><pre>${randomWord.translation}</pre>`;
}

export function handleAbout(): string {
  return "This bot was created by Fraol Lemecha. All the code and dictionary data can be found <a href='https://github.com/frectonz/ScienceWordToAmharicBot'>here</a>";
}

export function handleSearch(searchWord: string): string {
  searchWord = searchWord.trim();

  const oneWord = words.find(({ word }) => areWordsEqual(searchWord, word));

  if (oneWord) {
    let response = `<pre>${oneWord.translation}</pre>\n\n`;

    const relatedWords = words
      .filter(
        ({ word }) =>
          word.toLowerCase().startsWith(searchWord.toLowerCase()) ||
          word.toLowerCase().endsWith(searchWord.toLowerCase())
      )
      .filter(({ word }) => !areWordsEqual(oneWord.word, word))
      .map((w, i) => `${i + 1}. ${w.word} - ${w.translation}`);

    if (relatedWords.length > 0) {
      response += "<b>Related Words:</b>\n";
      response += relatedWords.splice(0, 10).join("\n");
    }

    return response;
  } else {
    return `I couldn't find <b>${searchWord}</b>.`;
  }
}

const areWordsEqual = (word1: string, word2: string): boolean =>
  word1.toLocaleLowerCase() === word2.toLocaleLowerCase();
