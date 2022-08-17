const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Adds a role to a member.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to add the role to.")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to add to the member.")
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
              "❌ You can't add a role to someone that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    if (member.roles.cache.has(role.id))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member already has that role.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    await member.roles.add(role).catch(() => {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I can't add a role that is higher/equal to my role.")
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
            `**${member.user.tag}** now has the **${role.name}** role!`
          )
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
