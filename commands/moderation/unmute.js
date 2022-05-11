const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmutes a member from the server.",
  aliases: ["um", "untimeout", "uto", "ut"],
  usage: "<user> [reason]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  userPerms: ["MANAGE_MEMBERS"],
  botPerms: ["MANAGE_ROLES"],
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason specified.";
    if (!member)
      return message.reply({
        content: "❌ Please specify a member to unmute.",
      });

    if (member === message.member)
      return message.reply({
        content: "❌ You are not allowed to unmute yourself.",
      });

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content:
          "❌ You are not allowed to unmute that member because they have an equal or higher role than you.",
      });
    if (!member.manageable)
      return message.reply({
        content: "❌ I am unable to unmute that member.",
      });

    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );
    if (!role)
      return message.reply({
        content:
          "❌ Seems like there is no mute role in this server. Please created a role called `Muted`.",
      });
    if (!member.roles.cache.has(role.id))
      return message.reply({
        content: "❌ That member is already unmuted.",
      });

    await member.roles.remove(role, reason);
    const embed = new MessageEmbed()
      .setTitle("*unzips mouth*")
      .setDescription(`I have successfully unmuted **${member.user.tag}**!`)
      .addField("Reason", reason)
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
