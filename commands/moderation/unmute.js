const {
  Client,
  Message,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmutes a member from the server, preventing them from typing.",
  userPerms: [PermissionFlagsBits.ModerateMembers],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to mention a member.")
            .setColor("Red"),
        ],
      });
    if (user.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't unmute a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
      });
    if (!user.moderatable)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot unmute that member.")
            .setColor("Red"),
        ],
      });
    if (!user.isCommunicationDisabled())
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member is not muted.")
            .setColor("Red"),
        ],
      });

    const reason = args.slice(1).join(" ") || "No reason specified.";

    user.timeout(null, reason);
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** is now unmuted from the server!\n>>> **Reason:** ${reason}`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
