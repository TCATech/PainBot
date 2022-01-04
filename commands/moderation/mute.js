const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mutes a member from the server.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  userPerms: ["MANAGE_MEMBERS"],
  botPerms: ["MANAGE_MEMBERS", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason specified.";
    if (!member)
      return message.reply({
        content: "❌ Please specify a member to mute.",
      });

    if (member === message.member)
      return message.reply({
        content: "❌ You are not allowed to mute yourself.",
      });

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content:
          "❌ You are not allowed to mute that member because they have an equal or higher role than you.",
      });
    if (!member.manageable)
      return message.reply({
        content: "❌ I am unable to mute that user.",
      });

    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );
    if (!role)
      return message.reply({
        content:
          "❌ Seems like there is no mute role in this server. Please created a role called `Muted`.",
      });
    if (member.roles.cache.has(role.id))
      return message.reply({
        content: "❌ That member is already muted.",
      });

    await member.roles.add(role, reason);
    const embed = new MessageEmbed()
      .setTitle("*zips mouth*")
      .setDescription(`I have successfully muted **${member.user.tag}**!`)
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
