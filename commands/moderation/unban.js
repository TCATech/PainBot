const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  description: "unban a member from the server",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const userID = args[0];

    message.guild.members.unban(userID).then((member) => {
      const embed = new MessageEmbed()
        .setTitle("Oh great he's screaming again.")
        .setDescription(
          `I have successfully unbanned **${user.tag}** from the server!`
        )
        .setColor(message.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();

      message.reply({
        embeds: [embed],
      });
    });
  },
};
