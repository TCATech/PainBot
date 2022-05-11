const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "prefix",
  description: "Change the prefix for your server.",
  aliases: [
    "setprefix",
    "set-prefix",
    "changeprefix",
    "change-prefix",
    "setup-prefix",
    "setupprefix",
  ],
  usage: "<new prefix>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0])
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("You didn't specify the new prefix. Please do so!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    if (args[0].length > 5)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("Your new prefix must be under 5 characters!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    client.settings.ensure(message.guild.id, {
      prefix: client.config.prefix,
    });
    if (args[0] === client.config.prefix || args[0] === "reset") {
      client.settings.set(message.guild.id, client.config.prefix, "prefix");

      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Woo!")
            .setDescription(
              `Your prefix has been reset to \`${client.config.prefix}\`!`
            )
            .setColor(message.color)
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    }

    client.settings.set(message.guild.id, args[0], "prefix");

    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Woo!")
          .setDescription(`Your prefix is now \`${args[0]}\`!`)
          .setColor(message.color)
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
};
