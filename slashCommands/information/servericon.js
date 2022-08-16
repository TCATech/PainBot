const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servericon")
    .setDescription("Gets the avatar of the server."),
  run: async (client, interaction) => {
    if (interaction.guild.icon) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${interaction.guild.name}'s Icon`)
            .setDescription(
              `[Click here to download](${interaction.guild
                .iconURL({ dynamic: true, size: 4096 })
                .replace("webp", "png")})`
            )
            .setImage(interaction.guild.iconURL({ dynamic: true, size: 4096 }))
            .setColor(client.config.color),
        ],
        ephemeral: true,
      });
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ This server doesn't have an icon.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }
  },
};
