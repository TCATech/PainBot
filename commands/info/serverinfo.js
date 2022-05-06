const { Client, Message, MessageEmbed } = require("discord.js");
const boostTier = {
  NONE: "None",
  TIER_1: "Tier 1",
  TIER_2: "Tier 2",
  TIER_3: "Tier 3",
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
    const embed = new MessageEmbed()
      .setTitle(`Information about ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 4096 }))
      .addField("Owner", `${guild.owner} (\`${guild.owner.tag}\`)`, false)
      .addField(
        "Created on",
        `<t:${parseInt(guild.createdTimestamp / 1000)}:f>`,
        false
      )
      .addField("All Channels", guild.channels.cache.size.toString(), true)
      .addField(
        "💬 Text Channels",
        guild.channels.cache
          .filter((c) => c.type === "GUILD_TEXT")
          .size.toString(),
        true
      )
      .addField(
        "🔈 Voice Channels",
        guild.channels.cache
          .filter((c) => c.type === "GUILD_VOICE")
          .size.toString(),
        true
      )
      .addField("Members", guild.memberCount.toString(), true)
      .addField(
        "👤 Humans",
        guild.members.cache.filter((m) => !m.user.bot).size.toString(),
        true
      )
      .addField(
        "🤖 Bots",
        guild.members.cache.filter((m) => m.user.bot).size.toString(),
        true
      )
      .addField(
        "AFK Channel",
        guild.afkChannel ? `<#${guild.afkChannel.id}>` : "None",
        true
      )
      .addField(
        "Rules Channel",
        guild.rulesChannel ? `<#${guild.rulesChannel.id}>` : "None",
        true
      )
      .addField(
        "Updates Channel",
        guild.publicUpdatesChannel
          ? `<#${guild.publicUpdatesChannel.id}>`
          : "None",
        true
      )
      .addField("Total Boosts", guild.premiumSubscriptionCount.toString(), true)
      .addField("Boost Tier", boostTier[guild.premiumTier], true)
      .setColor(message.color)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    message.reply({
      embeds: [embed],
    });
  },
};
