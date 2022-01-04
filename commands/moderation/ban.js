const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans a member from the server.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  userPerms: ["BAN_MEMBERS"],
  botPerms: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason specified.";
    if (!member)
      return message.reply({
        content: "❌ Please specify a member to ban.",
      });
    if (member === message.member)
      return message.reply({
        content: "❌ You are not allowed to ban yourself.",
      });
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content:
          "❌ You are not allowed to ban that member because they have an equal or higher role than you.",
      });
    if (!member.bannable)
      return message.reply({
        content: "❌ I am unable to ban that member.",
      });
    member.ban({ reason });
    const embed = new MessageEmbed()
      .setTitle("And there they go!")
      .setDescription(
        `I have successfully banned **${member.user.tag}** from the server!`
      )
      .addField("Reason", reason)
      .setColor(message.color)
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
