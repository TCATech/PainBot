const { MessageEmbed } = require("discord.js");
const { Command } = require("reconlx");

module.exports = new Command({
  name: "membercount",
  description: "Tells you how many members are currently in your server.",
  run: async ({ client, interaction }) => {
    const { guild } = interaction;
    const { config } = client;

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .addField("Members", interaction.guild.memberCount)
          .addField(
            "Humans",
            interaction.guild.members.cache
              .filter((member) => !member.user.bot)
              .size.toLocaleString()
          )
          .addField(
            "Bots",
            interaction.guild.members.cache
              .filter((member) => member.user.bot)
              .size.toLocaleString()
          )
          .setColor(config.color)
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
});
