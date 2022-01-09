const { Client, Message, MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
  name: "play",
  description: "Plays a cool song in your voice channel.",
  botPerms: ["CONNECT"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const songTitle = args.join(" ");

    if (!message.member.voice.channel) {
      return message.reply({
        content: "❌ Please join a voice channel!",
      });
    }

    if (!songTitle)
      return message.reply({
        content: "❌ Please specify a song to play!",
      });

    const searchResult = await player.search(songTitle, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(message.guild, {
      metadata: message.channel,
    });

    if (!queue.connection) await queue.connect(message.member.voice.channel);

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
