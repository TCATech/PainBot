const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks a member from the server.",
  aliases: ["k"],
  usage: "<member> [reason]",
  userPerms: [PermissionFlagsBits.KickMembers],
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason specified.";
    if (!member)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to mention a member.")
            .setColor("Red"),
        ],
      });
    if (member === message.member)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You can't kick yourself.")
            .setColor("Red"),
        ],
      });
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't kick a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
      });
    if (!member.kickable)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot kick that member.")
            .setColor("Red"),
        ],
      });
    member.kick(reason);

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** is now kicked from the server!\n>>> **Reason:** ${reason}`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
