const {
  Client,
  Guild,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Guild} guild
 */
module.exports = async (client, guild) => {
  let channel = guild.channels.cache.find(
    (c) =>
      c.type === ChannelType.GuildText &&
      c
        .permissionsFor(client.user)
        .has(PermissionFlagsBits.SendMessages | PermissionFlagsBits.EmbedLinks)
  );

  channel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle("Thanks for adding me!")
        .setDescription(
          `
        > My default prefix is \`>\`
        > You can find all my commands by typing \`>help\`
        > You can change my prefix by typing \`>prefix <new prefix>\`
        > If you're having trouble with the bot, you can join the support server by [clicking here.](https://discord.gg/5FxTT5WRgt)
        `
        )
        .setColor(client.config.color),
    ],
  });
};
