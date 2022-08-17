const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flips a coin for you."),
  run: async (client, interaction) => {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = "heads";
    else result = "tails";
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(":coin:  Coin Flip  :coin:")
          .setDescription(`It was **${result}**!`)
          .setColor(client.config.color),
      ],
    });
  },
};
