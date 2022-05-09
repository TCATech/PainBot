const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "playtop",
  description:
    "Plays a song in a voice channel and adds it to the top of the queue.",
  aliases: ["pt"],
  usage: "<song name or url>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { guildId, channelId } = message;
    if (!message.member.voice.channel)
      return message.reply({
        embeds: [
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
      message.guild.me.voice.channel &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
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

    const query = args.join(" ");
    if (!query)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Uh oh!")
            .setDescription("You didn't specify a song to play. Please do so!")
            .setColor("RED")
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });

    const res = await message.reply({
      content: "🔎 Searching for: `" + query + "`...",
    });

    const queue = client.distube.getQueue(guildId);
    let options = {
      member: message.member,
      unshift: true,
    };
    if (!queue)
      options.textChannel = message.guild.channels.cache.get(channelId);

    await client.distube.play(message.member.voice.channel, query, options);

    let result = "";
    if (!queue) {
      result = client.distube.getQueue(guildId).songs[0].name;
    } else {
      result = queue?.songs[1].name;
    }
    res.edit({
      content: `${
        queue?.songs?.length > 0
          ? "👍 Added to the top of the queue"
          : "🎶 Now playing"
      }: \`${result}\``,
    });
  },
};
