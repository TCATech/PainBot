const { Client, Message } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skips the current song.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = player.getQueue(message.guild.id);
    if (!queue?.playing)
      return interaction.followUp({
        content: "❌ Nothing is currently being played in this server.",
      });

    await queue.skip();
    return message.reply({
      embeds: [
        {
          description: "⏭️ | Skipped the current song",
          color: message.color,
        },
      ],
    });
  },
};
