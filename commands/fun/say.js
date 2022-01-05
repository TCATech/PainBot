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
    if (!args[0]) {
      return message.author.send("Please specify a message I can say!");
    }
    message.channel.send(args.join(' '));
  },
};
