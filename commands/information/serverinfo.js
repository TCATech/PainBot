const { Client, Message, EmbedBuilder } = require("discord.js");
const boostTier = {
  0: "None",
  1: "Tier 1",
  2: "Tier 2",
  3: "Tier 3",
};

module.exports = {
  name: "serverinfo",
  description: "Get some info about the server.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { guild } = message;
    guild.owner = await message.guild
      .fetchOwner()
      .then((m) => m.user)
      .catch(() => {});
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Information about ${guild.name}`,
        iconURL: guild.iconURL({ dynamic: true }),
      })
      .addFields(
        {
          name: "<:arrow_yellow:1008715428731826227> Owner",
          value: `${guild.owner} (\`${guild.owner.tag}\`)`,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> Created on",
          value: `<t:${parseInt(guild.createdTimestamp / 1000)}:f>`,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> All Channels",
          value: guild.channels.cache.size.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> 💬 Text Channels",
          value: guild.channels.cache
            .filter((c) => c.type === "GUILD_TEXT")
            .size.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> 🔈 Voice Channels",
          value: guild.channels.cache
            .filter((c) => c.type === "GUILD_VOICE")
            .size.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> Members",
          value: guild.memberCount.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> 👤 Humans",
          value: guild.members.cache.filter((m) => !m.user.bot).size.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> 🤖 Bots",
          value: guild.members.cache.filter((m) => m.user.bot).size.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> AFK Channel",
          value: guild.afkChannel ? `<#${guild.afkChannel.id}>` : "None",
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> Rules Channel",
          value: guild.rulesChannel ? `<#${guild.rulesChannel.id}>` : "None",
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> Updates Channel",
          value: guild.publicUpdatesChannel
            ? `<#${guild.publicUpdatesChannel.id}>`
            : "None",
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> Total Boosts",
          value: guild.premiumSubscriptionCount.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> Boost Tier",
          value: `${boostTier[guild.premiumTier]}`,
          inline: true,
        }
      )
      .setColor(client.config.color);
    message.reply({
      embeds: [embed],
    });
  },
};
