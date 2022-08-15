const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Mutes a member from the server.",
  aliases: ["m", "timeout", "to", "t"],
  usage: "<user> [reason]",
  userPerms: ["ModerateMembers"],
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const time = args[1];
    const reason = args.slice(2).join(" ") || "No reason specified.";
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
            .setTitle("❌ You can't mute yourself.")
            .setColor("Red"),
        ],
      });

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't mute a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
      });
    if (!member.moderatable)
      return message.reply({
        content: "❌ I am unable to mute that user.",
      });
    if (member.isCommunicationDisabled())
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member is already muted.")
            .setColor("Red"),
        ],
      });

    if (!time)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to specify a time for the mute.")
            .setColor("Red"),
        ],
      });

    member.timeout(ms(time), reason);

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${
              member.user.tag
            }** is now muted from the server!\n>>> **Time:** ${ms(ms(time), {
              long: true,
            })}\n**Reason:** ${reason}`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
