const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nick")
    .setDescription("Change the nickname of a member")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to change the nickname of.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("The nickname to set.")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  run: async (client, interaction) => {
    const member = interaction.options.getMember("member");

    const nick = interaction.options.getString("nickname") || null;

    if (
      member !== interaction.member &&
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "❌ You can't change the nickname of a member that has a higher/equal role to you."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    if (!member.manageable)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ I cannot change that member's nickname.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    await member.setNickname(nick);

    if (nick === null)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(`**${member.user.tag}**'s nickname has been reset!`)
            .setColor(client.config.color),
        ],
        ephemeral: true,
      });
    else
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(
              `**${member.user.tag}**'s nickname has been changed to **${nick}**!`
            )
            .setColor(client.config.color),
        ],
        ephemeral: true,
      });
  },
};
