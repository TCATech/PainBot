const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "kicks a member from the server.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason specified.";
    if (!member)
      return message.reply({
        content: "❌ Please specify a member to kick.",
      });
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content:
          "❌ You are not allowed to kick that user because they have an equal or higher role than you.",
      });
    try {
      member.kick(reason);
      const embed = new MessageEmbed()
        .setTitle("And there they go!")
        .setDescription(
          `I have successfully kicked ${member.user.tag} from the server!`
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
    } catch (err) {
      message.reply({
        content: `❌ There was an error trying to kick that user!\n \`${err}\``,
      });
    }
  },
};
