const { Client, Message, MessageAttachment } = require("discord.js");
const pop = require("popcat-wrapper");

module.exports = {
  name: "drip",
  description: "Sheeeeeeeeeeeeeeeeesh!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first().user || message.author;

    const res = await pop.drip(member.displayAvatarURL({ format: "png" }));
    const img = new MessageAttachment(res, "drip.png");
    message.reply({
      files: [img],
    });
  },
};
