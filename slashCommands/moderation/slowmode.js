const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Changes the slowmode of the current channel.")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("The amount of time for the slowmode.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  run: async (client, interaction) => {
    const { channel } = interaction;

    const arg = interaction.options.getString("time");

    if (ms(arg) > ms("6h"))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ Slowmode can't be set to more than 6 hours.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    channel.setRateLimitPerUser(ms(arg) / 1000);

    if (arg.includes("0")) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(`This channel's slowmode is now disabled.`)
            .setColor(client.config.color),
        ],
        ephemeral: true,
      });
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `This channel's slowmode is now set to **${ms(ms(arg), {
              long: true,
            })}**.`
          )
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
