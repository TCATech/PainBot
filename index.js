const Discord = require("discord.js");
const Enmap = require("enmap");
require("dotenv/config");

const client = new Discord.Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  rest: { offset: 0 },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.config = require("./config.json");

client.commands = new Discord.Collection();

client.settings = new Enmap({
  name: "settings",
  dataDir: "./databases/settings",
});

Array("commands", "events", "features").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
