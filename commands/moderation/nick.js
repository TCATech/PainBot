const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "nick",
  description: "Change the nickname of a member.",
  aliases: ["nickname"],
  usage: "<member> [new nickname]",
  userPerms: [PermissionFlagsBits.ManageNicknames],
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to mention a member.")
            .setColor("Red"),
        ],
      });

    const nick = args.slice(1).join(" ") || null;

    if (
      member !== message.member &&
      member.roles.highest.position >= message.member.roles.highest.position
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't change the nickname of a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
      });

    if (!member.manageable)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot change that member's nickname.")
            .setColor("Red"),
        ],
      });

    await member.setNickname(nick);

    if (nick === null)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(`**${member.user.tag}**'s nickname has been reset!`)
            .setColor(client.config.color),
        ],
      });
    else
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(
              `**${member.user.tag}**'s nickname has been changed to **${nick}**!`
            )
            .setColor(client.config.color),
        ],
      });
  },
};
