const { Client, Message } = require("discord.js");

module.exports = {
  name: "purge",
  description: "deletes a specific amount of messages",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.reply({
      content: "WIP",
    });
  },
};
