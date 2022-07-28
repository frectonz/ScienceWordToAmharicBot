import "dotenv/config";
import express from "express";
import { webhookCallback } from "grammy";

import makeBot from "./bot";
import { getBotToken, getDomain, getPort } from "./env";

const PORT = getPort();
const token = getBotToken();

const bot = makeBot(token);

if (process.env.NODE_ENV === "production") {
  const domain = getDomain();

  const app = express();
  app.use(express.json());
  app.get("/", (_, res) => {
    res.send("Hello, World!");
  });

  app.use(`/${token}`, webhookCallback(bot, "express"));

  app.listen(PORT, async () => {
    await bot.api.setWebhook(`https://${domain}/${token}`);
    console.log(`Listening on port ${PORT}...`);
  });
} else {
  bot.start();
  console.log("Running in development mode...");
}
