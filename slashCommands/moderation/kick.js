const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks a member from the server.",
  aliases: ["k"],
  usage: "<user> [reason]",
  userPerms: ["KickMembers"],
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a member from the server.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to kick.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the kick.")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  run: async (client, interaction) => {
    const member = interaction.options.getMember("member");
    const reason =
      interaction.options.getString("reason") || "No reason specified.";

    if (member === interaction.member)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You can't kick yourself.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't kick a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    if (!member.kickable)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot kick that member.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    member.kick(reason);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** is now kicked from the server!\n>>> **Reason:** ${reason}`
          )
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
