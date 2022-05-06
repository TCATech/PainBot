const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "servericon",
  description: "Gets the avatar of the server.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.guild.icon) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`${message.guild.name}'s Icon`)
            .setDescription(
              `[Click here to download](${message.guild
                .iconURL({ dynamic: true, size: 4096 })
                .replace("webp", "png")})`
            )
            .setImage(message.guild.iconURL({ dynamic: true, size: 4096 }))
            .setColor(message.color)
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    } else {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("This server doesn't have an icon.")
            .setColor(message.color)
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    }
  },
};
