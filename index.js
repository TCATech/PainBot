const { Client, Collection } = require("discord.js");
const client = new Client({
  intents: 32767,
  restTimeOffset: 0,
});
module.exports = client;

client.config = require("./config");
client.commands = new Collection();
client.events = new Collection();

require("./handler")(client);

client.login(client.config.token);
