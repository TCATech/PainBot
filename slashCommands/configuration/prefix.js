const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  usage: "<new prefix>",
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Change the prefix for your server.")
    .addStringOption((option) =>
      option
        .setName("new_prefix")
        .setDescription("The new prefix.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  run: async (client, interaction) => {
    const arg = interaction.options.getString("new_prefix");

    if (arg.length > 5)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`❌ Prefix has to be less than 5 characters long.`)
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    client.settings.set(interaction.guild.id, arg, "prefix");

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`✅ The prefix in this server is now \`${arg}\`.`)
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
