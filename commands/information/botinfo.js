const {
  Client,
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const { version } = require("../../package.json");

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
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.tag,
        iconURL: client.user.displayAvatarURL(),
      })
      .addFields(
        {
          name: "Servers watching",
          value: client.guilds.cache.size.toLocaleString(),
          inline: true,
        },
        {
          name: "Channels watching",
          value: client.channels.cache.size.toLocaleString(),
          inline: true,
        },
        {
          name: "Users watching",
          value: client.users.cache.size.toString(),
          inline: true,
        },
        {
          name: "Commands",
          value: client.commands.size.toLocaleString(),
          inline: true,
        },
        {
          name: "Prefix",
          value: `\`${message.prefix}\``,
          inline: true,
        },
        {
          name: "Made with",
          value: `[discord.js](https://github.com/discordjs/discord.js)`,
          inline: true,
        },
        {
          name: "Version",
          value: version,
          inline: true,
        },
        {
          name: "Up since",
          value: `<t:${parseInt(client.startTime / 1000)}:R>`,
          inline: true,
        },
        {
          name: "Developer",
          value: client.users.cache.get("955408387905048637").tag,
          inline: true,
        }
      )
      .setColor(client.config.color);

    message.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(5)
            .setLabel("Invite")
            .setURL("https://painbot.tk/invite"),
          new ButtonBuilder()
            .setStyle(5)
            .setLabel("Vote")
            .setURL("https://painbot.tk/vote")
        ),
      ],
    });
  },
};
