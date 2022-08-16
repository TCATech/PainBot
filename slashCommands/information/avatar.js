const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Gets the avatar of a specific person, or yourself.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The user to get the avatar from.")
        .setRequired(false)
    ),
  run: async (client, interaction) => {
    const member =
      interaction.options.getMember("member") || interaction.member;
    const avatar = member.user.displayAvatarURL({ dynamic: true, size: 4096 });
    const embed = new EmbedBuilder()
      .setTitle(member.displayName + "'s Avatar")
      .setDescription(
        "[Click here to download](" + avatar.replace("webp", "png") + ")"
      )
      .setImage(avatar)
      .setColor(client.config.color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
