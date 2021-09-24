const { Message, Client, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "ping",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const res = await message.channel.send({
      content: "Pinging...",
    });

    const ping = res.createdTimestamp - message.createdTimestamp;

    const embed = new MessageEmbed()
      .setTitle("Pong! 🏓")
      .addField("Bot Latency", `${ping}ms`, true)
      .addField("API Latency", `${client.ws.ping}ms`, true)
      .addField("Uptime", ms(client.uptime), false)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setColor(message.color)
      .setTimestamp();
    res.edit({
      embeds: [embed],
    });
  },
};
