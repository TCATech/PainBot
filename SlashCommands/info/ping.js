const { Interaction, Client, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "ping",
  description:
    "Pong! Tells you the amount of ping/latency PainBot currently has.",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const res = await interaction.reply({
      content: "Pinging...",
      ephemeral: true,
      fetchReply: true,
    });

    const ping = res.createdTimestamp - interaction.createdTimestamp;

    const embed = new MessageEmbed()
      .setTitle("Pong! 🏓")
      .addField("Bot Latency", `${ping}ms`, true)
      .addField("API Latency", `${client.ws.ping}ms`, true)
      .addField("Uptime", ms(client.uptime), false)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(interaction.color)
      .setTimestamp();
    interaction.editReply({
      content: "** **",
      embeds: [embed],
    });
  },
};