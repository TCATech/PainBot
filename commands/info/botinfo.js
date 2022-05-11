const {
  Client,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "botinfo",
  description: "Tells you some info about PainBot.",
  aliases: ["bi", "bot"],
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
        "Servers watching",
        `${client.guilds.cache.size.toLocaleString()} server${
          client.guilds.cache.size > 1 ? "s" : ""
        }`,
        true
      )
      .addField(
        "Channels watching",
        client.channels.cache.size.toLocaleString(),
        true
      )
      .addField("Users watching", client.users.cache.size.toString(), true)
      .addField("Commands", client.commands.size.toLocaleString(), true)
      .addField("Prefix", `\`${message.prefix}\``, true)
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
      .addField("Developer", "Not TCA#3060", true)
      .setColor(client.config.color);

    message.reply({
      embeds: [embed],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("LINK")
            .setLabel("Invite")
            .setURL("https://painbot.tk/invite"),
          new MessageButton()
            .setStyle("LINK")
            .setLabel("Vote")
            .setURL("https://painbot.tk/vote")
        ),
      ],
    });
  },
};
