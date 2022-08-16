const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a member from the server.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to ban.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban.")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  run: async (client, interaction) => {
    const member = interaction.options.getMember("member");
    const reason =
      interaction.options.getString("reason") || "No reason specified.";

    if (member === interaction.member)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You can't ban yourself.")
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
              "❌ You can't ban a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    if (!member.bannable)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot ban that member.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    member.ban({ reason });

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** is now banned from the server!\n>>> **Reason:** ${reason}`
          )
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
