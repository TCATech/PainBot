const { EmbedBuilder } = require("discord.js");
const { hexToRgb, hexToHsl } = require("../../utils/functions");

module.exports = {
  name: "color",
  description: "Generates a random color for you.",
  aliases: ["colour", "randomcolor", "randomcolour"],
  run: async (client, message) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const rgb = `${hexToRgb(randomColor).r}, ${hexToRgb(randomColor).g}, ${
      hexToRgb(randomColor).b
    }`;
    const int = parseInt(randomColor, 16);
    const hsl = hexToHsl(randomColor);

    message.reply({
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
