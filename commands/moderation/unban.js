const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unbans a member from the server.",
  userPerms: [PermissionFlagsBits.BanMembers],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const userID = args[0];
    if (!userID)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to mention a member ID.")
            .setColor("Red"),
        ],
      });

    try {
      message.guild.members.unban(userID).then((user) => {
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("✅ Success!")
              .setDescription(
                `**${user.tag}** is now unbanned from the server!`
              )
              .setColor(client.config.color),
          ],
        });
      });
    } catch {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member isn't banned from the server.")
            .setColor("Red"),
        ],
      });
    }
  },
};
