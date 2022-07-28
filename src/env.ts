export const getPort = () =>
  process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const getBotToken = () => {
  if (!process.env.BOT_TOKEN) {
    console.log("Environment variable BOT_TOKEN is not found.");
    process.exit();
  }

  return process.env.BOT_TOKEN;
};

export const getDomain = () => {
  if (!process.env.DOMAIN) {
    console.log("Environment variable DOMAIN is not found.");
    process.exit();
  }
  return process.env.DOMAIN;
};
