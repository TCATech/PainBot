const { Client, Message, MessageEmbed } = require("discord.js");
const changeSettings = require("../../utils/changeSettings");

module.exports = {
  name: "settings",
  description: "Change some settings about the bot.",
  userPerms: ["MANAGE_SERVER"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("ERROR: No setting selected!")
            .setDescription(
              "Please select which setting you would like to change."
            )
            .addField("Usage", `${message.prefix}settings <choice> [value]`)
            .addField(`\u200B`, "__**General**__")
            .addField("Prefix", `prefix`)
            .addField(`\u200B`, "__**Moderation**__")
            .addField("Mute role", "Coming soon!")
            .addField("Audit logs channel", "Coming soon!")
            .setColor(message.color)
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    } else if (args[0] === "config") {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Current server configuration")
            .addField(`\u200B`, "__**General**__")
            .addField("Prefix", `${message.prefix}`)
            .addField(`\u200B`, "__**Moderation**__")
            .addField("Mute role", "muterole <@role or role ID>")
            .addField("Audit logs channel", "Coming soon!")
            .setColor(message.color)
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    } else if (args[0] === "prefix") {
      changeSettings.prefix(client, message, args, 1);
    }
  },
};
