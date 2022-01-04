const { Client, Message } = require("discord.js");

module.exports = {
  name: "join",
  description: "Makes PainBot join the voice channel you are currently in.",
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

    await vc.join().then((connection) => {
      connection.voice.setSelfDeaf(true);
    });
    message.react("👋");
  },
};
