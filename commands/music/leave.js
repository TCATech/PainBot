const { Client, Message } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: "leave",
  description: "Makes PainBot leave the voice channel you are currently in.",
  aliases: ["dc", "disconnect", "exit"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const connection = getVoiceConnection(message.guild.id);

    if (!message.member.voice.channel) {
      return message.reply({
        content: "❌ Please join a voice channel!",
      });
    }

    await connection.destroy();
    message.react("👋");
  },
};
