const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "coin",
  description: "Flips a coin for you.",
  aliases: ["cointoss", "coinflip", "flip"],
  run: async (client, message) => {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = "heads";
    else result = "tails";
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(":coin:  Coin Flip  :coin:")
          .setDescription(`It was **${result}**!`)
          .setColor(client.config.color),
      ],
    });
  },
};
