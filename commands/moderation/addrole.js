const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "addrole",
  description: "Adds a role to a member.",
  userPerms: ["ManageRoles"],
  usage: "<member> <role to add>",
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
              "❌ You can't add a role to someone that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
      });

    if (member.roles.cache.has(role.id))
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ That member already has that role.")
            .setColor("Red"),
        ],
      });

    await member.roles.add(role).catch(() => {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I can't add a role that is higher/equal to my role.")
            .setColor("Red"),
        ],
      });
    });

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("✅ Success!")
          .setDescription(
            `**${member.user.tag}** now has the **${role.name}** role!`
          )
          .setColor(client.config.color),
      ],
    });
  },
};
