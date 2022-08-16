const { EmbedBuilder } = require("discord.js");
const { animals } = require("nampis");

module.exports = {
  name: "dog",
  description: "Fetches you a cute dog.",
  aliases: ["doggy", "puppy", "pup"],
  run: async (client, message, args) => {
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🐶 Woof! 🐶")
          .setImage(await animals.dog())
          .setColor(client.config.color),
      ],
    });
  },
};
