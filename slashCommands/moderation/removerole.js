const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Removes a role from a member.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to remove the role from.")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to remove from the member.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  run: async (client, interaction) => {
    const member = interaction.options.getMember("member");
    const role = interaction.options.getRole("role");

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't remove a role from someone that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    if (!member.roles.cache.has(role.id))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member doesn't have that role.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    await member.roles.remove(role).catch(() => {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ I can't remove a role that is higher/equal to my role."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    });

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** no longer has the **${role.name}** role!`
          )
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
