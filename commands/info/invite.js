const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite PainBot to your server.",
  aliases: ["add", "invitebot", "invite-bot", "inviteme", "invite-me"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`Invite me to your server`)
      .setURL(
        `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1075214&scope=bot`
      )
      .setColor(client.config.color)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setEmoji("➕")
        .setStyle("LINK")
        .setLabel("Invite")
        .setURL(
          `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1075214&scope=bot`
        ),
      new MessageButton()
        .setEmoji("970681425672151072")
        .setStyle("LINK")
        .setLabel("Support Server")
        .setURL("https://discord.gg/t7e48xn5Nq")
    );

    message.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
