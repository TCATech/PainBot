const { EmbedBuilder } = require("discord.js");
const { duration } = require("../../utils/functions");

module.exports = {
  name: "uptime",
  description: "Shows the bot's uptime.",
  run: async (client, message) => {
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**${
              client.user.username
            }** has been online for: \n>>>  *${duration(client.uptime).join(
              ", "
            )}*`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
