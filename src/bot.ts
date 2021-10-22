import { Bot } from "grammy";
import { getWords } from "./db";

export default function makeBot(token: string) {
  const bot = new Bot(token);
  const words = getWords();

  bot.api.setMyCommands([
    { command: "start", description: "Starts the bot" },
    { command: "random", description: "Get a random word" },
    { command: "about", description: "Information about the bot" },
  ]);

  bot.command("start", (ctx) => {
    ctx.reply(
      `Hi, ${ctx.from?.username}.\nIf you want to search for a translation of word send it as a message.\nOr get a random word translation with /random`
    );
  });

  bot.command("random", (ctx) => {
    const randomWord = words[Math.floor(Math.random() * words.length)];

    ctx.reply(`<b>${randomWord.word}</b> => <b>${randomWord.translation}</b>`, {
      parse_mode: "HTML",
    });
  });

  bot.command("about", (ctx) => {
    ctx.reply(
      "This bot was created by Fraol Lemecha. All the code and dictionary data can be found <a href='https://github.com/fraol0912/ScienceWordToAmharicBot'>here</a>",
      {
        parse_mode: "HTML",
      }
    );
  });

  bot.on("message:text", async (ctx) => {
    const searchWord = ctx.message.text.trim();

    console.log("[SEARCH_WORD]:", searchWord);

    const foundWords = words.filter(({ word }) =>
      searchWord.toLowerCase().includes(word.toLowerCase())
    );

    console.log("[FOUND_WORD]:", foundWords);

    if (foundWords.length === 0) {
      ctx.reply(`No translation found for "${searchWord}".`);
    } else {
      let message = foundWords
        .map((word, i) => `${i + 1}, ${word.word} => ${word.translation}`)
        .join("\n");

      ctx.reply(`<b>Translations</b>\n${message}`, {
        parse_mode: "HTML",
      });
    }
  });

  return bot;
}
