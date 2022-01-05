const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Gets the avatar of a specific person, or yourself.",
  options: [
    {
      name: "member",
      description: "Member to get avatar from.",
      type: "USER",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  run: async (client, interaction) => {
    const member = interaction.options.getUser("member") || interaction.user;
    const embed = new MessageEmbed()
      .setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
      .setTitle("Avatar")
      .setColor(interaction.color)
      .setImage(member.displayAvatarURL({ dynamic: true, size: 256 }))
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
