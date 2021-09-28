const { Client, Message, MessageAttachment } = require("discord.js");

module.exports = {
  name: "whowouldwin",
  aliases: ["www", "win"],
  description: "Who would win?",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message) => {
    const opponent = message.mentions.members.first();

    if (!opponent)
      return message.reply({
        content: "❌ Please specify your opponent.",
      });

    const opponentAvatar = opponent.user.displayAvatarURL({ format: "png" });
    const userAvatar = message.author.displayAvatarURL({ format: "png" });

    const url = `https://api.popcat.xyz/whowouldwin?image2=${opponentAvatar}&image1=${userAvatar}`;
    const img = new MessageAttachment(url, "whowouldwin.png");
    const msg = await message.reply({
      files: [img],
      allowedMentions: {
        repliedUser: false,
      },
    });

    msg.react("1️⃣");
    msg.react("2️⃣");
  },
};
