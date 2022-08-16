const { EmbedBuilder } = require("discord.js");
const { animals } = require("nampis");

module.exports = {
  name: "cat",
  description: "Fetches you a cute cat.",
  aliases: ["kitty", "kitten"],
  run: async (client, message) => {
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🐱 Meow! 🐱")
          .setImage(await animals.cat())
          .setColor(client.config.color),
      ],
    });
  },
};
