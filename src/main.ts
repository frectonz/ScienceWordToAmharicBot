import express from "express";
import { webhookCallback } from "grammy";

import makeBot from "./bot";

if (!process.env.BOT_TOKEN) {
  console.log("Environment variable BOT_TOKEN is not found.");
  process.exit();
}

if (!process.env.DOMAIN) {
  console.log("Environment variable DOMAIN is not found.");
  process.exit();
}

const domain = process.env.DOMAIN;
const secretPath = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

const bot = makeBot(secretPath);
const app = express();

app.use(express.json());
app.get("/", (_, res) => {
  res.send("Hello, World!");
});

app.use(`/${secretPath}`, webhookCallback(bot, "express"));

app.listen(PORT, async () => {
  await bot.api.setWebhook(`https://${domain}/${secretPath}`);
  console.log(`Listening on port ${PORT}...`);
});
