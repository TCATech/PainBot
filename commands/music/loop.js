const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "loop",
  description: "Toggle queue loop or song loop.",
  aliases: ["repeat", "l"],
  usage: "[off, song, or queue]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { member, guild, guildId } = message;
    const { channel } = member.voice;
    if (!channel)
      return message.reply({
        mbeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("You're not in a voice channel. Please join one!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });

    if (
      guild.me.voice.channel &&
      guild.me.voice.channel.id !== member.voice.channel.id
    )
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("I'm already connected to another voice channel!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });

    let newQueue = client.distube.getQueue(guildId);
    if (!newQueue || !newQueue.songs || newQueue.songs.length === 0)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("I'm not playing anything right now!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });

    const option = args[0] ? args[0].toLowerCase() : null;
    let loop;
    if (!args[0]) {
      switch (newQueue.repeatMode) {
        case 0:
          {
            loop = 1;
          }
          break;
        case 1:
          {
            loop = 2;
          }
          break;
        case 2:
          {
            loop = 0;
          }
          break;
      }
    } else if (
      option === "song" ||
      option === "track" ||
      option === "s" ||
      option === "t"
    ) {
      if (newQueue.repeatMode === 1) {
        loop = 0;
      } else {
        loop = 1;
      }
    } else if (option === "queue" || option === "qu" || option === "q") {
      if (newQueue.repeatMode === 2) {
        loop = 0;
      } else {
        loop = 2;
      }
    } else if (option === "off" || option === "stop") {
      loop = 0;
    }
    let loopMsg = "";
    switch (loop) {
      case 0:
        {
          loopMsg = "Off";
        }
        break;
      case 1:
        {
          loopMsg = "Repeat song";
        }
        break;
      case 2:
        {
          loopMsg = "Repeat queue";
        }
        break;
    }
    newQueue.setRepeatMode(loop);
    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Yay!")
          .setDescription(`Loop mode has been set to: ${loopMsg}`)
          .setColor(client.config.color)
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
};
