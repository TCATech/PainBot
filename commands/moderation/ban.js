const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans a member from the server.",
  aliases: ["b"],
  usage: "<user> [reason]",
  userPerms: ["BanMembers"],
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
            .setTitle("❌ You can't ban yourself.")
            .setColor("Red"),
        ],
      });
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't ban a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
      });
    if (!member.bannable)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot ban that member.")
            .setColor("Red"),
        ],
      });

    member.ban({ reason });

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** is now banned from the server!\n>>> **Reason:** ${reason}`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
