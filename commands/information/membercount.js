const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "membercount",
  aliases: ["members"],
  description: "Tells you the amount of members that are in your server.",
  run: async (client, message) => {
    const { guild } = message;
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
    message.reply({
      embeds: [embed],
    });
  },
};
