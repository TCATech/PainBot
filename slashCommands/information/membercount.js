const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Tells you the amount of members that are in your server."),
  run: async (client, interaction) => {
    const { guild } = interaction;
    await guild.members.fetch();
    const memberCount = guild.memberCount;
    const humanCount = guild.members.cache.filter((m) => !m.user.bot).size;
    const botCount = guild.members.cache.filter((m) => m.user.bot).size;

    const embed = new EmbedBuilder()
      .addFields(
        {
          name: "Members",
          value: memberCount.toLocaleString(),
        },
        {
          name: "Humans",
          value: humanCount.toLocaleString(),
        },
        {
          name: "Bots",
          value: botCount.toLocaleString(),
        }
      )
      .setColor(client.config.color);
    interaction.reply({
      embeds: [embed],
    });
  },
};
