const { Client, Message } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  name: "join",
  description: "Makes PainBot join the voice channel you are currently in.",
  aliases: ["summon", "enter"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const vc = message.member.voice.channel;

    if (!vc) {
      return message.reply({
        content: "❌ Please join a voice channel!",
      });
    }

    joinVoiceChannel({
      channelId: vc.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    message.react("👋");
  },
};
