const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
let cpuStat = require("cpu-stat");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Shows some statistics about the bot."),
  run: async (client, interaction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Getting information...")
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
    cpuStat.usagePercent(function (e, percent, seconds) {
      if (e) {
        return console.log(e);
      }

      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.tag,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle("📈 Statistics")
        .addFields(
          {
            name: "📅 Created",
            value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
          },
          {
            name: "⚙️ Commands",
            value: "`" + client.commands.size.toLocaleString() + "`",
            inline: true,
          },
          {
            name: "📁 Watching",
            value: `\`${client.guilds.cache.size} servers\``,
            inline: true,
          },
          {
            name: "👤 Users",
            value: "`" + client.users.cache.size.toString() + "`",
            inline: true,
          },
          {
            name: "⌚ Uptime",
            value: `<t:${parseInt(client.startTime / 1000)}:f>`,
            inline: true,
          },
          {
            name: "📶 Ping",
            value: "`" + client.ws.ping + "ms`",
            inline: true,
          },
          {
            name: "😎 The Nerdy Stuff",
            value: `
\`\`\`yml
Node.js Version: ${process.version}
Discord.js Version: v${version}
Enmap Version: v5.9.0
CPU Usage: ${percent.toFixed(2)}%
RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}% / ${(
              process.memoryUsage().heapTotal /
              1024 /
              1024
            ).toFixed(2)}
\`\`\``,
          }
        )
        .setColor(client.config.color);

      interaction.editReply({
        embeds: [embed],
      });
    });
  },
};
