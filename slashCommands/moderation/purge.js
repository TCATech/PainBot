const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Deletes a specific amount of messages from the channel.")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete.")
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  run: async (client, interaction) => {
    const amount = interaction.options.getNumber("amount");

    const messages = await interaction.channel.messages.fetch({
      limit: amount + 1,
    });

    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days") && !msg.pinned
    );

    await interaction.channel.bulkDelete(filtered);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(`${amount} messages have been deleted!`)
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
