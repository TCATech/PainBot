const { EmbedBuilder } = require("discord.js");
const got = require("got");

module.exports = {
  name: "meme",
  description: "Fetches you a very funny meme.",
  aliases: ["redditmeme", "rm"],
  run: async (client, message, args) => {
    await message
      .reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Fetching a meme...")
            .setColor(client.config.color),
        ],
      })
      .then((msg) => {
        got(`https://www.reddit.com/r/memes/random/.json`).then(
          async (response) => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;

            const embed = new EmbedBuilder()
              .setTitle(`${memeTitle}`)
              .setURL(memeUrl)
              .setImage(memeImage)
              .setColor(client.config.color)
              .setFooter({
                text: `👍 ${memeUpvotes} | 👎 ${memeDownvotes} | 💬 ${memeNumComments} comments`,
              });

            msg.edit({
              embeds: [embed],
            });
          }
        );
      });
  },
};
