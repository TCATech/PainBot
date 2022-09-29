const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "purge",
  description: "Deletes a specific amount of messages from the channel.",
  aliases: ["prune", "clear"],
  usage: "<amount of messages>",
  userPerms: ["ManageMessages"],
  run: async (client, message, args) => {
    const amount = parseInt(args[0]);

    if (amount > 100)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You can only delete up to 100 messages.")
            .setColor("Red"),
        ],
      });

    if (isNaN(amount))
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ Please specify a number.")
            .setColor("Red"),
        ],
      });

    const messages = await message.channel.messages.fetch({
      limit: amount + 1,
    });

    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days") && !msg.pinned
    );

    await message.delete();
    await message.channel.bulkDelete(filtered);

    message.channel
      .send({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Success!")
            .setDescription(`${amount} messages have been deleted!`)
            .setColor(client.config.color),
        ],
      })
      .then((v) => setTimeout(() => v.delete(), 5_000));
  },
};
