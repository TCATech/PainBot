const { Client, Message, MessageEmbed } = require("discord.js");

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
            .addField("Prefix", `prefix | Current value: ${message.prefix}`)
            .addField(`\u200B`, "__**Moderation**__")
            .addField(
              "Mute or timeout",
              "usemute/usetimeout | Current value: (coming soon)"
            )
            .addField(
              "Mute role",
              "muterole <@role or role ID> | Current value: (coming soon)"
            )
            .addField("Audit logs channel", "Coming soon!")
            .setColor(message.color)
            .setFooter(
              client.user.username,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp(),
        ],
      });
    }
  },
};
