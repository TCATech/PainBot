const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "botinfo",
  description: "get info about the bot",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message) => {
    const embed = new MessageEmbed()
      .setAuthor(
        client.user.tag,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .addField(
        "Used in",
        `${client.guilds.cache.size.toLocaleString()} server${
          client.guilds.cache.size > 1 ? "s" : ""
        }`,
        true
      )
      .addField("Prefix", `\`${message.prefix}\``, true)
      .addField(
        "Channels watching",
        client.channels.cache.size.toLocaleString(),
        true
      )
      .addField("API Ping", `${client.ws.ping.toString()}ms`, true)
      .addField(
        "Made with",
        `[discord.js](https://github.com/discordjs/discord.js)`,
        true
      )
      .addField("Version", client.config.version, true)
      .addField(
        "Created on",
        moment(client.user.createdAt).format("MMMM D, YYYY"),
        true
      )
      .addField("Commands", client.commands.size.toLocaleString(), true)
      .addField("Developer", "Not TCA#3060", true)
      .addField(
        "Links",
        "[Invite](https://dsc.gg/PainBotXD) | [Vote](https://top.gg/bot/849960798809358367/vote)"
      )
      .setColor(message.color);

    message.reply({
      embeds: [embed],
    });
  },
};
