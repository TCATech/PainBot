const { Client, Message } = require("discord.js");

module.exports = {
  name: "search",
  description: "Searches for a song on YouTube.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("You didn't specify a song to play. Please do so!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });

    const res = await message.reply({
      content: "🔎 Searching for: `" + query + "`...",
    });
    const searchResults = await client.distube.search(query);

    if (!searchResults.length)
      res.edit({
        content: "❌ No results found for `" + query + "`.",
      });

    let i = 0;
    res.edit({
      content:
        "🔎 Results for: `" +
        query +
        "`:\n\n" +
        searchResults
          .map(
            (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
          )
          .join("\n")
          .substr(0, 2000),
    });
  },
};
