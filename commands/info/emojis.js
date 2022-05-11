const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojis",
  description: "Lists all emojis in this server.",
  aliases: ["emotes"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.guild.emojis.cache || message.guild.emojis.cache.size === 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("There are no emojis in this server.")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    }

    const embed = new MessageEmbed()
      .setTitle("Emojis")
      .setDescription(
        message.guild.emojis.cache
          .map((e) => {
            return `${e} = ${e.id}`;
          })
          .join("\n")
      )
      .setColor(client.config.color)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.reply({
      embeds: [embed],
    });
  },
};
