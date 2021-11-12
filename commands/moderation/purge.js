const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "purge",
  description: "deletes a specific amount of messages",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  userPerms: ['MANAGE_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  run: async (client, message, args) => {
    const amount = parseInt(args[0]);

    if (amount > 100)
      return message.reply({
        content: "❌ You can only delete up to 100 messages.",
      });

    if (isNaN(amount))
      return message.reply({
        content: "❌ Please specify a number.",
      });

    const messages = await message.channel.messages.fetch({
      limit: amount,
    });

    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days") && !msg.pinned
    );

    await message.delete();
    await message.channel.bulkDelete(filtered);

    const embed = new MessageEmbed()
      .setTitle("Poof!")
      .setDescription(`I have successfuly deleted ${amount} messages!`)
      .setColor(message.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    return message.channel
      .send({
        embeds: [embed],
      })
      .then((v) => setTimeout(() => v.delete(), ms("5 seconds")));
  },
};
