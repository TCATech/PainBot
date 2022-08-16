const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Tells you some info about PainBot."),
  run: async (client, interaction) => {
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
          value: `\`${client.settings.get(interaction.guild.id, "prefix")}\``,
          inline: true,
        },
        {
          name: "Made with",
          value: `[discord.js](https://github.com/discordjs/discord.js)`,
          inline: true,
        },
        {
          name: "Version",
          value: process.env.npm_package_version,
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

    interaction.reply({
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
      ephemeral: true,
    });
  },
};
