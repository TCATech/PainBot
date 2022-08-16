const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pings the Discord API and returns the latency."),
  run: async (client, interaction, args) => {
    interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Pinging...")
            .setColor(client.config.color),
        ],
        ephemeral: true,
        fetchReply: true,
      })
      .then((res) => {
        const ping = res.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Pong! 🏓")
              .setDescription(
                `>>> **Bot latency:** ${ping}ms\n**API latency:** ${client.ws.ping}ms`
              )
              .setColor(client.config.color),
          ],
        });
      });
  },
};
