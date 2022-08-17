const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { duration } = require("../../utils/functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Shows the bot's uptime."),
  run: async (client, interaction) => {
    interaction.reply({
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
      ephemeral: true,
    });
  },
};
