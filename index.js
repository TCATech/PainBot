const Discord = require("discord.js");
const Enmap = require("enmap");
require("dotenv/config");

const client = new Discord.Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  rest: { offset: 0 },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

Array("events").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
