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
      .setTitle("Members")
      .setDescription(memberCount.toString())
      .setColor(client.color)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    message.channel.send({
      embeds: [embed],
    });
  },
};
