const { Client, Message, MessageEmbed } = require("discord.js");
const { animals } = require("nampis");

module.exports = {
  name: "cat",
  description: "Fetches you a cute cat.",
  aliases: ["kitty", "kitten"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("🐱 Meow! 🐱")
      .setImage(await animals.cat())
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(message.color)
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  },
};
