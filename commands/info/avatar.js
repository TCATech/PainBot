const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Gets the avatar of a specific person, or yourself.",
  aliases: ["pfp"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const embed = new MessageEmbed()
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("Avatar")
      .setColor(message.color)
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
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
