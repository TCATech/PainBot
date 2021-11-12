const { Client, Message } = require("discord.js");

module.exports = {
  name: "say",
  description: "Makes PainBot say whatever you want :)",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  botPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    message.delete();
    message.channel.send(args[0]);
  },
};
