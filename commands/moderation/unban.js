const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unbans a member from the server.",
  aliases: ["ub"],
  usage: "<userID>",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  userPerms: ["BAN_MEMBERS"],
  botPerms: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    const userID = args[0];

    try {
      message.guild.members.unban(userID).then((user) => {
        const embed = new MessageEmbed()
          .setTitle("Oh great he's screaming again.")
          .setDescription(
            `I have successfully unbanned **${user.tag}** from the server!`
          )
          .setColor(message.color)
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();

        message.reply({
          embeds: [embed],
        });
      });
    } catch {
      message.reply({
        content: "❌ That user isn't banned in this server.",
      });
    }
  },
};
