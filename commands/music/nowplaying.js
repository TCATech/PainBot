const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  description: "Shows the currently playing song.",
  aliases: ["np", "current"],
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
    let newTrack = newQueue.songs[0];

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Currently playing:",
        iconURL:
          "https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif",
      })
      .setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
      .setTitle(newTrack.name)
      .setURL(newTrack.url)
      .addField("⏱ Duration", `\`${newTrack.formattedDuration}\``)
      .addField(
        "<:youtube:969787760342868098> Uploader",
        `[${newTrack.uploader.name}](${newTrack.uploader.url})`
      )
      .addField("🔁 Queue Length", newQueue.songs.length.toString())
      .setColor(client.config.color)
      .setFooter({
        text: `Requested by: ${newTrack.user.tag}`,
        iconURL: newTrack.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.reply({
      embeds: [embed],
    });
  },
};
