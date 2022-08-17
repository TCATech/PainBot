const { Client, Message, EmbedBuilder } = require("discord.js");

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
  userPerms: ["ManageGuild"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0])
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`❌ You need to provide a prefix.`)
            .setColor("Red"),
        ],
      });
    if (args[0].length > 5)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`❌ Prefix has to be less than 5 characters long.`)
            .setColor("Red"),
        ],
      });

    client.settings.set(message.guild.id, args[0], "prefix");

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`✅ The prefix in this server is now \`${args[0]}\`.`)
          .setColor(client.config.color),
      ],
    });
  },
};
