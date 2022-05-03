const {Client, Message, MessageEmbed} = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Gets the avatar of a specific person, or yourself.",
  aliases: ["av", "pfp"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const avatar = member.user.displayAvatarURL({dynamic: true, size: 4096});
    const embed = new MessageEmbed()
      .setTitle(member.displayName + "'s Avatar")
      .setDescription(
        "[Click here to download](" + avatar.replace("webp", "png") + ")"
      )
      .setColor(message.color)
      .setImage(avatar)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({dynamic: true}),
      })
      .setTimestamp();

    message.reply({
      embeds: [embed],
    });
  },
};
