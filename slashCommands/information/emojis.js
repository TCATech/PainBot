const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getRow } = require("../../utils/functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("emojis")
    .setDescription("Lists all emojis in this server."),
  run: async (client, interaction) => {
    if (
      !interaction.guild.emojis.cache ||
      interaction.guild.emojis.cache.size === 0
    ) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("❌ This server doesn't have any emojis.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }

    const embeds = [];
    let cut = 10;

    for (let i = 0; i < interaction.guild.emojis.cache.size; i += 10) {
      const current = [...interaction.guild.emojis.cache.values()].slice(
        i,
        cut
      );

      const embed = new EmbedBuilder()
        .setTitle(
          `Emojis (Page ${embeds.length + 1}/${Math.ceil(
            interaction.guild.emojis.cache.size / 10
          )})`
        )
        .setDescription(
          current
            .map((e) => {
              return `${e} = ${e.id}`;
            })
            .join("\n")
        )
        .setColor(client.config.color);
      embeds.push(embed);
      cut += 10;
    }

    let cur = 0;

    const res = await interaction.reply({
      embeds: [embeds[0]],
      components: [getRow(cur, embeds)],
      ephemeral: true,
      fetchReply: true,
    });

    const filter = (i) =>
      i.user.id === interaction.member.id && i.message.id === res.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", (i) => {
      if (i.customId !== "prev" && i.customId !== "next") return;

      if (i.customId === "prev" && cur > 0) {
        cur -= 1;
        i.update({
          embeds: [embeds[cur]],
          components: [getRow(cur, embeds)],
        });
      } else if (i.customId === "next" && cur < embeds.length - 1) {
        cur += 1;
        i.update({
          embeds: [embeds[cur]],
          components: [getRow(cur, embeds)],
        });
      }
    });
  },
};
