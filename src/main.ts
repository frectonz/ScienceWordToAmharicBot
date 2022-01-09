import makeBot from "./bot";

if (process.env.BOT_TOKEN) {
  const bot = makeBot(process.env.BOT_TOKEN);
  bot.start();
} else {
  console.log("Environment variable BOT_TOKEN is not found.");
}
