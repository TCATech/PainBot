const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Retrive the last deleted message in the current channel.",
  userPerms: [PermissionFlagsBits.ManageMessages],
  run: async (client, message, args) => {
    const snipes = client.snipes.get(message.channel.id);
    if (!snipes)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ There are no deleted messages in this channel.")
            .setColor("Red"),
        ],
      });

    const target = snipes[0];

    const { msg, image, time } = target;

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: msg.author.tag,
            iconURL: msg.author.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(msg.content || null)
          .setImage(image)
          .setColor(client.config.color)
          .setTimestamp(time),
      ],
    });
  },
};
