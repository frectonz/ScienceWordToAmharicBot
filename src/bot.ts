import { Bot } from "grammy";

import {
  handleAbout,
  handleRandomWord,
  handleSearch,
  handleStart,
} from "./handlers";

export default function makeBot(token: string) {
  const bot = new Bot(token);

  bot.api.setMyCommands([
    { command: "start", description: "Starts the bot" },
    { command: "random", description: "Get a random word" },
    { command: "about", description: "Information about the bot" },
  ]);

  bot.command("start", (ctx) => {
    const msg = handleStart(ctx.from?.username || "user");
    ctx.reply(msg);
  });

  bot.command("random", (ctx) => {
    const msg = handleRandomWord();
    ctx.reply(msg, {
      parse_mode: "HTML",
    });
  });

  bot.command("about", (ctx) => {
    const msg = handleAbout();
    ctx.reply(msg, {
      parse_mode: "HTML",
    });
  });

  bot.on("message:text", async (ctx) => {
    const msg = handleSearch(ctx.message.text);
    ctx.reply(msg, {
      parse_mode: "HTML",
    });
  });

  return bot;
}
