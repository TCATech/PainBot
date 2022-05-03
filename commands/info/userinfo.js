const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require("../../utils/emojis.json");
const statuses = {
  online: `${emojis.online} \`Online\``,
  idle: `${emojis.idle} \`AFK\``,
  offline: `${emojis.offline} \`Offline\``,
  dnd: `${emojis.dnd} \`Do Not Disturb\``,
};
const flags = {
  DISCORD_EMPLOYEE: `${emojis.discord_employee} \`Discord Employee\``,
  DISCORD_PARTNER: `${emojis.discord_partner} \`Partnered Server Owner\``,
  BUGHUNTER_LEVEL_1: `${emojis.bughunter_level_1} \`Bug Hunter (Level 1)\``,
  BUGHUNTER_LEVEL_2: `${emojis.bughunter_level_2} \`Bug Hunter (Level 2)\``,
  HYPESQUAD_EVENTS: `${emojis.hypesquad_events} \`HypeSquad Events\``,
  HOUSE_BRAVERY: `${emojis.house_bravery} \`House of Bravery\``,
  HOUSE_BRILLIANCE: `${emojis.house_brilliance} \`House of Brilliance\``,
  HOUSE_BALANCE: `${emojis.house_balance} \`House of Balance\``,
  EARLY_SUPPORTER: `${emojis.early_supporter} \`Early Supporter\``,
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: `${emojis.verified_bot} \`Verified Bot\``,
  VERIFIED_DEVELOPER: `${emojis.verified_developer} \`Early Verified Bot Developer\``,
};

module.exports = {
  name: "userinfo",
  description: "Gets some info about a user.",
  aliases: ["ui", "user", "uinfo", "whois", "wi"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const userFlags = (await member.user.fetchFlags()).toArray();
    const activities = [];
    let customStatus;
    if (member.presence) {
      for (const activity of member.presence.activities.values()) {
        switch (activity.type) {
          case "PLAYING":
            activities.push(`Playing **${activity.name}**`);
            break;
          case "LISTENING":
            if (member.user.bot)
              activities.push(`Listening to **${activity.name}**`);
            else
              activities.push(
                `Listening to **${activity.details}** by **${activity.state}**`
              );
            break;
          case "WATCHING":
            activities.push(`Watching **${activity.name}**`);
            break;
          case "STREAMING":
            activities.push(`Streaming **${activity.name}**`);
            break;
          case "CUSTOM_STATUS":
            customStatus = activity.state;
            break;
        }
      }
    }

    const roles =
      member.roles.cache
        .map((r) => r)
        .join(" ")
        .replace("@everyone", " ") || "None";

    const embed = new MessageEmbed()
      .setTitle(`Information about ${member.displayName}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField("User", `<@${member.id}>`, true)
      .addField("Discriminator", `\`#${member.user.discriminator}\``, true)
      .addField("ID", `\`${member.id}\``, true)
      .addField(
        "Status",
        member.presence
          ? statuses[member.presence.status]
          : statuses["offline"],
        true
      )
      .addField(
        "Bot",
        member.user.bot ? emojis.toggle_on : emojis.toggle_off,
        true
      )
      .addField("\u200B", "\u200B", true)
      .addField(
        "Member of the server since",
        `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
        true
      )
      .addField(
        "Discord user since",
        `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
        true
      )
      .setColor(message.color)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    if (userFlags.length > 0)
      embed.addField("Badges", userFlags.map((flag) => flags[flag]).join("\n"));

    return message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: true,
        users: [],
      },
    });
  },
};
