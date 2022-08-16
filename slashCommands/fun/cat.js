const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { animals } = require("nampis");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Fetches you a cute cat."),
  run: async (client, interaction) => {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🐱 Meow! 🐱")
          .setImage(await animals.cat())
          .setColor(client.config.color),
      ],
    });
  },
};
