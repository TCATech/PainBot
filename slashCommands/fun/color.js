const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { hexToRgb, hexToHsl } = require("../../utils/functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomcolor")
    .setDescription("Generates a random color for you."),
  run: async (client, interaction) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const rgb = `${hexToRgb(randomColor).r}, ${hexToRgb(randomColor).g}, ${
      hexToRgb(randomColor).b
    }`;
    const int = parseInt(randomColor, 16);
    const hsl = hexToHsl(randomColor);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Here's your random color:")
          .setDescription(
            `>>> **HEX:** \`#${randomColor}\`
            **RGB:** \`${rgb}\`
            **INT:** \`${int}\`
            **HSL:** \`${hsl}\``
          )
          .setColor(randomColor),
      ],
    });
  },
};
