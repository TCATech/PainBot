const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Pings the Discord API and returns the latency.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel
      .send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Pinging...")
            .setColor(client.config.color),
        ],
      })
      .then((res) => {
        const ping = res.createdTimestamp - message.createdTimestamp;

        res.edit({
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
