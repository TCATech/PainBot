const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans a member from the server.")
    .addStringOption((option) =>
      option
        .setName("member_id")
        .setDescription("The ID of the member to unban.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  run: async (client, interaction) => {
    const userID = interaction.options.getString("member_id");

    try {
      interaction.guild.members.unban(userID).then((user) => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("✅ Success!")
              .setDescription(
                `**${user.tag}** is now unbanned from the server!`
              )
              .setColor(client.config.color),
          ],
          ephemeral: true,
        });
      });
    } catch {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member isn't banned from the server.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }
  },
};
