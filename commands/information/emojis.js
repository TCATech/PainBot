const {
  Client,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");

module.exports = {
  name: "emojis",
  description: "Lists all emojis in this server.",
  aliases: ["emotes"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.guild.emojis.cache || message.guild.emojis.cache.size === 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("❌ This server doesn't have any emojis.")
            .setColor("Red"),
        ],
      });
    }

    const embeds = [];
    let cut = 10;

    for (let i = 0; i < message.guild.emojis.cache.size; i += 10) {
      const current = [...message.guild.emojis.cache.values()].slice(i, cut);

      const embed = new EmbedBuilder()
        .setTitle(
          `Emojis (Page ${embeds.length + 1}/${Math.ceil(
            message.guild.emojis.cache.size / 10
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

    const getRow = () => {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("prev")
          .setStyle(2)
          .setEmoji("994438542077984768")
          .setDisabled(cur === 0),
        new ButtonBuilder()
          .setCustomId("next")
          .setStyle(2)
          .setEmoji("994438540429643806")
          .setDisabled(cur === embeds.length - 1)
      );

      return row;
    };

    const res = await message.channel.send({
      embeds: [embeds[0]],
      components: [getRow()],
    });

    const filter = (i) =>
      i.user.id === message.member.id && i.message.id === res.id;
    const collector = message.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", (i) => {
      if (!i) return;

      if (i.customId !== "prev" && i.customId !== "next") return;

      if (i.customId === "prev" && cur > 0) {
        cur -= 1;
        i.update({
          embeds: [embeds[cur]],
          components: [getRow()],
        });
      } else if (i.customId === "next" && cur < embeds.length - 1) {
        cur += 1;
        i.update({
          embeds: [embeds[cur]],
          components: [getRow()],
        });
      }
    });
  },
};
