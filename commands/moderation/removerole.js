const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "removerole",
  description: "Removes a role from a member.",
  userPerms: [PermissionFlagsBits.ManageRoles],
  usage: "<member> <role to remove>",
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!member)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to mention a member.")
            .setColor("Red"),
        ],
      });

    if (!role)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You need to mention a role.")
            .setColor("Red"),
        ],
      });

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't remove a role from someone that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
      });

    if (!member.roles.cache.has(role.id))
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member doesn't have that role.")
            .setColor("Red"),
        ],
      });

    await member.roles.remove(role).catch(() => {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ I can't remove a role that is higher/equal to my role."
            )
            .setColor("Red"),
        ],
      });
    });

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** no longer has the **${role.name}** role!`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
