const { Client, Message, MessageEmbed } = require("discord.js");
const player = require("../../client/player");

module.exports = {
  name: "resume",
  description: "Resumes the currently playing song if it is currently paused.",
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

    if (queue?.connection.paused === false) {
      return message.reply({
        content: "❌ The current song is currently not paused.",
      });
    } else if (queue?.connection.paused === true) {
      await queue.setPaused(false);
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription("⏸️ | Resumed current track")
            .setColor(message.color),
        ],
      });
    }
  },
};
