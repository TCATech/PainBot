const { Client, Message } = require("discord.js");

module.exports = {
  name: "rewind",
  description: "Rewinds the currently playing song.",
  usage: "<time>",
  aliases: ["rwd"],
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

    if (!args[0])
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription(
              "You didn't specify the amount of time to rewind the song to. Please do so!"
            )
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

    let seekNumber = Number(args[0]);
    let seektime = newQueue.currentTime - seekNumber;
    if (seektime < 0) seektime = 0;
    if (seektime >= newQueue.songs[0].duration - newQueue.currentTime)
      seektime = 0;

    // if (Number(args[0]) < 0 || Number(args[0]) > newQueue.songs[0])
    //   return message.reply({
    //     embeds: [
    //       new MessageEmbed()
    //         .setTitle("Uh oh!")
    //         .setDescription(
    //           "You can only rewind between 0 and the length of the current song!"
    //         )
    //         .setColor("RED")
    //         .setFooter({
    //           text: client.user.username,
    //           iconURL: client.user.displayAvatarURL({ dynamic: true }),
    //         })
    //         .setTimestamp(),
    //     ],
    //   });

    await newQueue.seek(seektime);

    client.distube.seek(guildId, Number(args[0]));
    message.react("⏪").catch(() => {});
  },
};
