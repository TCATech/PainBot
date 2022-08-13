const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "servericon",
  description: "Gets the avatar of the server.",
  run: async (client, message, args) => {
    if (message.guild.icon) {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${message.guild.name}'s Icon`)
            .setDescription(
              `[Click here to download](${message.guild
                .iconURL({ dynamic: true, size: 4096 })
                .replace("webp", "png")})`
            )
            .setImage(message.guild.iconURL({ dynamic: true, size: 4096 }))
            .setColor(client.config.color),
        ],
      });
    } else {
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ This server doesn't have an icon.")
            .setColor("Red"),
        ],
      });
    }
  },
};
