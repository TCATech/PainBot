const { Client, Message } = require("discord.js");
const player = require("../../client/player");

module.exports = {
  name: "volume",
  description: "Changes the volume of the current song.",
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

    const volume = parseInt(args[0]);
    if (!volume || volume > 100 || volume < 0) {
      return message.reply({
        content: "❌ Please specify a number between 0 and 100.",
      });
    }

    await queue.setVolume(volume);
    return message.reply({
      embeds: [
        {
          description: `🔊 | The volume of the current song is now ${volume}%.`,
          color: message.color,
        },
      ],
    });
  },
};
