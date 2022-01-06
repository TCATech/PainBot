const { Client, Interaction, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "botinfo",
  description: "Tells you some info about PainBot.",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  run: async (client, interaction) => {
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
      .addField("Prefix", `\`/\``, true)
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
        "[Invite](https://painbot.tk/invite) | [Vote](https://top.gg/bot/849960798809358367/vote)"
      )
      .setColor(interaction.color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
