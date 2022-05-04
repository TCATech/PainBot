const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "sendtimedmsg",
  description: "Send a message after a specific amount of time.",
  aliases: ["stm", "timedmsg", "tmsg"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message;
    const time = ms(args[0]);
    if (!time)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("You didn't specify a time. Please do so!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    args.shift();
    const msg = args.join(" ");
    if (!msg)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("You didn't specify a message. Please do so!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });

    setTimeout(() => {
      channel.send(msg.toString());
    }, time);
    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Success!")
          .setDescription("Your message will be sent in " + ms(time) + ".")
          .setColor("GREEN")
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
};
