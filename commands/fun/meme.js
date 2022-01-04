const { MessageEmbed } = require("discord.js");
const got = require("got");

module.exports = {
  name: "meme",
  description: "Fetches you a very funny meme.",
  run: async (client, message, args) => {
    message.channel.send("Fetching you a funny meme...").then((msg) => {
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

          const embed = new MessageEmbed()
            .setTitle(`${memeTitle}`)
            .setURL(`${memeUrl}`)
            .setImage(memeImage)
            .setColor(message.color)
            .setFooter({
              text: `👍 ${memeUpvotes} | 👎 ${memeDownvotes} | 💬 ${memeNumComments}`,
            })
            .setTimestamp();

          msg.edit({
            content: "** **",
            embeds: [embed],
          });
        }
      );
    });
  },
};
