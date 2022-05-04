// Bot client

const { Client, Collection } = require("discord.js");
require("dotenv/config");
const client = new Client({
  intents: 32767,
  restTimeOffset: 0,
});
module.exports = client;

client.config = require("./config");
client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.categories = require("fs").readdirSync(`./commands`);

require("./handler")(client);

client.login(process.env.TOKEN);
