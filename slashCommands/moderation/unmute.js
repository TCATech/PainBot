const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a member from the server.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to unmute.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the unmute.")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  run: async (client, interaction) => {
    const user = interaction.options.getMember("member");

    if (
      user.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't unmute a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    if (!user.moderatable)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot unmute that member.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    if (!user.isCommunicationDisabled())
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member is not muted.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    const reason =
      interaction.options.getString("reason") || "No reason specified.";

    user.timeout(null, reason);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${user.user.tag}** is now unmuted from the server!\n>>> **Reason:** ${reason}`
          )
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
