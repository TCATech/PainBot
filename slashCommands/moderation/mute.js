const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes a member from the server.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to mute.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("The amount of time for the mute.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban.")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  run: async (client, interaction) => {
    const member = interaction.options.getMember("member");
    const time = interaction.options.getString("time");
    const reason =
      interaction.options.getString("reason") || "No reason specified.";

    if (member === interaction.member)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You can't mute yourself.")
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
              "❌ You can't mute a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    if (!member.moderatable)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot mute that member.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    if (member.isCommunicationDisabled())
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member is already muted.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    if (!time)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to specify a time for the mute.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    member.timeout(ms(time), reason);

    interaction.reply({
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
      ephemeral: true,
    });
  },
};
