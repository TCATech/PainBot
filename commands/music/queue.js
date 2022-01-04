const { Client, Message } = require("discord.js");
const player = require("../../client/player");

module.exports = {
  name: "queue",
  description: "Displays the queue for this server.",
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

    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. [${m.title}](${m.url}) - ${m.requestedBy.tag}`;
    });

    return message.reply({
      embeds: [
        {
          author: {
            name: `${message.guild.name} Queue`,
            iconURL: message.guild.iconURL({ dynamic: true }),
          },
          description: `${tracks.join("\n")}${
            queue.tracks.length > tracks.length
              ? `\n...${
                  queue.tracks.length - tracks.length === 1
                    ? `${queue.tracks.length - tracks.length} more track`
                    : `${queue.tracks.length - tracks.length} more tracks`
                }`
              : ""
          }`,
          fields: [
            {
              name: "🎶 | Now Playing",
              value: `[**${queue.current.title}**](${queue.current.url}) - ${queue.current.requestedBy.tag}`,
            },
          ],
          color: message.color,
          footer: {
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          },
          timestamp: Date.now(),
        },
      ],
    });
  },
};
