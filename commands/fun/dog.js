const { Client, Message, MessageEmbed } = require("discord.js");
const { animals } = require("nampis");

module.exports = {
  name: "dog",
  description: "Fetches you a cute dog.",
  aliases: ["doggy", "puppy", "pup"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("🐶 Woof! 🐶")
      .setImage(await animals.dog())
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(message.color)
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  },
};
