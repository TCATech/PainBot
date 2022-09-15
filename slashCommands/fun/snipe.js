const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Retrive the last deleted message in the current channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  run: async (client, interaction) => {
    const snipes = client.snipes.get(interaction.channel.id);
    if (!snipes)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ There are no deleted messages in this channel.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    const target = snipes[0];

    const { msg, image, time } = target;

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: msg.author.tag,
            iconURL: msg.author.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(msg.content || null)
          .setImage(image)
          .setColor(client.config.color)
          .setTimestamp(time),
      ],
    });
  },
};
