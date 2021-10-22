import { Bot } from "grammy";

import { getWords } from "./db";

if (process.env.BOT_TOKEN) {
  const bot = new Bot(process.env.BOT_TOKEN);
  const words = getWords();

  bot.api.setMyCommands([{ command: "start", description: "Starts the bot" }]);

  bot.command("start", (ctx) => {
    ctx.reply(`Hi, ${ctx.from?.username}`);
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

  bot.start();
} else {
  console.log("Environment variable BOT_TOKEN is not found.");
}
