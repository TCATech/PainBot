const { Client, Message } = require("discord.js");
const player = require("../../client/player");

module.exports = {
  name: "np",
  description: "Shows information about the currently playing song.",
  aliases: [
    "nowplaying",
    "nowPlaying",
    "now-playing",
    "currentlyplaying",
    "currentlyPlaying",
    "currently-playing",
    "playing",
  ],
  /**
   *
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

    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    return message.reply({
      embeds: [
        {
          title: "🎶 | Now Playing",
          description: `[**${queue.current.title}**](${queue.current.url}) - ${queue.current.requestedBy.tag}`,
          fields: [
            {
              name: "\u200b",
              value: progress,
            },
          ],
          color: message.color,
          footer: {
            text: `Requested by ${queue.current.requestedBy.tag}`,
            iconURL: queue.current.requestedBy.displayAvatarURL({
              dynamic: true,
            }),
          },
          timestamp: Date.now(),
        },
      ],
    });
  },
};
