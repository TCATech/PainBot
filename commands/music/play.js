const { Client, Message, MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
  name: "play",
  description: "Plays a cool song in your voice channelC.",
  botPerms: ["CONNECT"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const songTitle = args.join(" ");
    const currentQueue = player.getQueue(message.guild.id);

    if (!message.member.voice.channel) {
      return message.reply({
        content: "❌ Please join a voice channel!",
      });
    }

    if (!songTitle) {
      if (!currentQueue?.playing) {
        return message.reply({
          content: "❌ Please specify a song to play!",
        });
      } else {
        if (currentQueue?.connection.paused === false) {
          return message.reply({
            content: "❌ The current song is currently not paused.",
          });
        } else if (currentQueue?.connection.paused === true) {
          await currentQueue.setPaused(false);
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setDescription("⏸️ | Resumed current track")
                .setColor(message.color),
            ],
          });
        }
      }
    }

    const searchResult = await player.search(songTitle, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(message.guild, {
      metadata: message.channel,
    });

    if (!queue.connection) await queue.connect(message.member.voice.channel);

    message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(`✅ | Enqueued [${track.title}](${track.url})`)
          .setColor("#FFFB00"),
      ],
    });

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
