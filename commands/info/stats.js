const Discord = require("discord.js");
const { Client, Message, MessageEmbed } = Discord;
const ms = require("ms");
let cpuStat = require("cpu-stat");

module.exports = {
  name: "stats",
  description: "Shows some statistics about the bot.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const res = await message.reply({
      content: "Getting information...",
    });
    cpuStat.usagePercent(function (e, percent, seconds) {
      if (e) {
        return console.log(e.stack ? String(e.stack).grey : String(e).grey);
      }
      let connectedchannelsamount = 0;
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }

      const embed = new MessageEmbed()
        .setAuthor({
          name: client.user.tag,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle("📈 Statistics")
        .addField(
          "📅 Created",
          `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
          false
        )
        .addField(
          "⚙️ Commands",
          "`" + client.commands.size.toString() + "`",
          true
        )
        .addField(
          "📁 Watching",
          `\`${client.guilds.cache.size} servers\``,
          true
        )
        .addField(
          "👤 Users",
          "`" + client.users.cache.size.toString() + "`",
          true
        )
        .addField(
          "⌚ Uptime",
          "`" + ms(client.uptime, { long: true }) + "`",
          true
        )
        .addField("📶 Ping", "`" + client.ws.ping + "ms`", true)
        .addField(
          "😎 The Nerdy Stuff",
          `
\`\`\`yml
Node.js Version: ${process.version}
Discord.js Version: v${Discord.version}
Enmap Version: v5.9.0

CPU Usage: ${percent.toFixed(2)}%
RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}% / ${(
            process.memoryUsage().heapTotal /
            1024 /
            1024
          ).toFixed(2)}

Voice channels connected: ${connectedchannelsamount}
\`\`\`
      `
        )
        .setColor(client.config.color);

      res.edit({
        embeds: [embed],
      });
    });
  },
};
