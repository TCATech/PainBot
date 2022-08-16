const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const boostTier = {
  0: "None",
  1: "Tier 1",
  2: "Tier 2",
  3: "Tier 3",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Get some info about the server."),
  run: async (client, interaction) => {
    const { guild } = interaction;
    guild.owner = await interaction.guild
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
            .filter((c) => c.type === 0)
            .size.toString(),
          inline: true,
        },
        {
          name: "<:arrow_yellow:1008715428731826227> 🔈 Voice Channels",
          value: guild.channels.cache
            .filter((c) => c.type === 2)
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
    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
