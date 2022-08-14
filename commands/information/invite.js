const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite PainBot to your server.",
  aliases: ["add", "invitebot", "invite-bot", "inviteme", "invite-me"],
  run: async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setTitle(`Invite me to your server`)
      .setURL(
        `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1075214&scope=bot`
      )
      .setColor(client.config.color);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setEmoji("➕")
        .setStyle(5)
        .setLabel("Invite")
        .setURL(
          `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1075214&scope=bot`
        ),
      new ButtonBuilder()
        .setEmoji("1007806571360825344")
        .setStyle(5)
        .setLabel("Invite with slash commands")
        .setURL(
          `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1075214&scope=bot%20applications.commands`
        )
    );

    message.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
