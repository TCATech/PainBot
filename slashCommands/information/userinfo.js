const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const statuses = {
  online: "🟢 Online",
  idle: "🌙 Idle",
  dnd: "🔴 Do Not Disturb",
  offline: "⚫ Offline",
};
const activitytype = {
  0: "Playing",
  1: "Streaming",
  2: "Listening to",
  3: "Watching",
  4: "Custom",
  5: "Competing",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get some information about a user.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to get information about.")
        .setRequired(false)
    ),
  run: async (client, interaction) => {
    const member =
      interaction.options.getMember("member") || interaction.member;

    const activity = member.presence
      ? member.presence.activities[0]
      : {
          type: "Custom",
          state: "None",
        };

    var userstatus = "No activity";
    if (activity) {
      if (activity.type === ActivityType.Custom) {
        let emoji = `${
          activity.emoji
            ? activity.emoji?.id
              ? `<${activity.emoji?.animated ? "a" : ""}:${
                  activity.emoji?.name
                }:${activity.emoji?.id}>`
              : activity.emoji?.name
            : ""
        }`;
        userstatus = `${emoji} \`${activity.state || "No activity"}\``;
      } else {
        userstatus = `\`${activitytype[activity.type]} ${activity.name}\``;
      }
    }

    const roles =
      member.roles.cache
        .map((r) => r)
        .join(" ")
        .replace("@everyone", " ") || "None";

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Information about ${member.user.tag}`,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .addFields(
        {
          name: `<:arrow_yellow:1008715428731826227> Username`,
          value: `> <@${member.user.id}>\n\`${member.user.tag}\``,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> ID`,
          value: `\`${member.user.id}\``,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> Avatar`,
          value: `[\`Link to avatar\`](${member.user
            .displayAvatarURL({
              dynamic: true,
              size: 4096,
            })
            .replace("webp", "png")})`,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> Bot`,
          value: `\`${member.user.bot ? "✅" : "❌"}\``,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> Joined Discord`,
          value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> Joined server`,
          value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> Status`,
          value: `\`${
            statuses[member.presence ? member.presence.status : "offline"]
          }\``,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> Activity`,
          value: `\`${userstatus}\``,
          inline: true,
        },
        {
          name: `<:arrow_yellow:1008715428731826227> Roles`,
          value: `${roles}`.substring(0, 2048),
          inline: false,
        }
      )
      .setColor(client.config.color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
