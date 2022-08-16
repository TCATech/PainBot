const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { animals } = require("nampis");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Fetches you a cute dog."),
  run: async (client, interaction) => {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🐶 Woof! 🐶")
          .setImage(await animals.dog())
          .setColor(client.config.color),
      ],
    });
  },
};
