const { Client, Message, MessageEmbed } = require("discord.js");
const player = require("../../client/player");

module.exports = {
  name: "pause",
  description: "Pauses the currently playing song if it is currently playing.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue?.playing)
      return message.reply({
        content: "❌ Nothing is currently playing in this server.",
      });

    if (queue?.connection.paused === true) {
      return message.reply({
        content: "❌ The current song is already paused!",
      });
    } else if (queue?.connection.paused === false) {
      await queue.setPaused(true);
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription("⏸️ | Paused current track")
            .setColor(message.color),
        ],
      });
    }
  },
};
