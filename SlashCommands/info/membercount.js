const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  description: "Tells you the amount of members that are in your server.",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  run: async (client, interaction) => {
    let { guild } = interaction;
    let memberCount = guild.memberCount;

    const embed = new MessageEmbed()
      .setTitle("Members")
      .setDescription(memberCount.toString())
      .setColor(interaction.color)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
