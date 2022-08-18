const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "slowmode",
  description: "Changes the slowmode of the current channel.",
  userPerms: [PermissionFlagsBits.ManageChannels],
  usage: "<time>",
  run: async (client, message, args) => {
    const { channel } = message;

    if (!args[0])
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to specify the new slowmode.")
            .setColor("Red"),
        ],
      });

    if (ms(args[0]) > ms("6h"))
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ Slowmode can't be set to more than 6 hours.")
            .setColor("Red"),
        ],
      });

    channel.setRateLimitPerUser(ms(args[0]) / 1000);

    if (args[0].includes("0")) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(`This channel's slowmode is now disabled.`)
            .setColor(client.config.color),
        ],
      });
    }

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `This channel's slowmode is now set to **${ms(ms(args[0]), {
              long: true,
            })}**.`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
