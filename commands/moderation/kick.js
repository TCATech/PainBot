const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks a member from the server.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  userPerms: ["KICK_MEMBERS"],
  botPerms: ["KICK_MEMBERS"],
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason specified.";
    if (!member)
      return message.reply({
        content: "❌ Please specify a member to kick.",
      });
    if (member === message.member)
      return message.reply({
        content: "❌ You are not allowed to kick yourself.",
      });
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content:
          "❌ You are not allowed to kick that member because they have an equal or higher role than you.",
      });
    if (!member.kickable)
      return message.reply({
        content: "❌ I am unable to kick that member.",
      });
    member.kick(reason);
    const embed = new MessageEmbed()
      .setTitle("And there they go!")
      .setDescription(
        `I have successfully kicked **${member.user.tag}** from the server!`
      )
      .addField("Reason", reason)
      .setColor(message.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.reply({
      embeds: [embed],
    });
  },
};
