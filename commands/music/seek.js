const { Client, Message } = require("discord.js");
const player = require("../../client/player");

module.exports = {
  name: "seek",
  description: "Seeks through the current song.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue?.playing) {
      return message.reply({
        content: "❌ Nothing is currently playing in this server.",
      });
    }

    if (isNaN(args[0])) {
      return message.reply({
        content: "❌ Please enter a valid number of seconds to seek.",
      });
    }

    const seekAmount = args[0] * 1000;

    await queue.seek(seekAmount);
    return message.react("✅");
  },
};
