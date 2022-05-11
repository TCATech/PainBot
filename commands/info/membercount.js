const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  aliases: ["members"],
  description: "Tells you the amount of members that are in your server.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let { guild } = message;
    let memberCount = guild.memberCount;

    const embed = new MessageEmbed()
      .addField("Members", memberCount.toString())
      .addField(
        "Humans",
        guild.members.cache.filter((m) => !m.user.bot).size.toString()
      )
      .addField(
        "Bots",
        guild.members.cache.filter((m) => m.user.bot).size.toString()
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
