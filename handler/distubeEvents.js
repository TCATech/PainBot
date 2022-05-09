const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const PlayerMap = new Map();
let songEditInterval = null;

module.exports = (client) => {
  client.distube
    .on("playSong", async (queue, track) => {
      try {
        if (!client.guilds.cache.get(queue.id).me.voice.deaf)
          client.guilds.cache
            .get(queue.id)
            .me.voice.setDeaf(true)
            .catch((e) => {
              //console.log(e.stack ? String(e.stack).grey : String(e).grey)
            });
      } catch (error) {
        console.log(error);
      }
      try {
        var newQueue = client.distube.getQueue(queue.id);
        var data = receiveQueueData(newQueue, track);
        let currentSongPlayMsg = await queue.textChannel
          .send(data)
          .then((msg) => {
            PlayerMap.set(`currentmsg`, msg.id);
            return msg;
          });

        var collector = currentSongPlayMsg.createMessageComponentCollector({
          filter: (i) =>
            i.isButton() && i.user && i.message.author.id == client.user.id,
          time: track.duration > 0 ? track.duration * 1000 : 600000,
        });

        let lastEdited = false;

        try {
          clearInterval(songEditInterval);
        } catch (e) {}
        songEditInterval = setInterval(async () => {
          if (!lastEdited) {
            try {
              var newQueue = client.distube.getQueue(queue.id);
              var data = receiveQueueData(newQueue, newQueue.songs[0]);
              await currentSongPlayMsg.edit(data).catch((e) => {
                //console.log(e.stack ? String(e.stack).grey : String(e).grey)
              });
            } catch (e) {
              clearInterval(songEditInterval);
            }
          }
        }, 10000);

        collector.on("collect", async (i) => {
          lastEdited = true;
          setTimeout(() => {
            lastEdited = false;
          }, 7000);
          let { member } = i;
          const { channel } = member.voice;

          if (!channel)
            return i.reply({
              content: `<:Cross:873399628500987945> **Please join a voice channel first!**`,
              ephemeral: true,
            });

          const queue = client.distube.getQueue(i.guild.id);
          if (!queue || !newQueue.songs || newQueue.songs.length == 0) {
            return i.reply({
              content: `<:Cross:873399628500987945> **Nothing currently playing.**`,
              ephemeral: true,
            });
          }

          if (channel.id !== newQueue.voiceChannel.id)
            return i.reply({
              content: `<:Cross:873399628500987945> **Please join __my__ voice channel first! <#${newQueue.voiceChannel.id}>**`,
              ephemeral: true,
            });

          switch (i.customId) {
            case "Previous":
              {
                try {
                  await client.distube.previous(i.guild.id);
                  i.reply({
                    embeds: [
                      new MessageEmbed()
                        .setColor("#fffb00")
                        .setTimestamp()
                        .setTitle(
                          `⏮️ **Now playing the previously played track!**`
                        )
                        .setFooter({
                          text: `💢 Action by: ${member.user.tag}`,
                          iconURL: member.user.displayAvatarURL({
                            dynamic: true,
                          }),
                        }),
                    ],
                  });
                } catch {
                  return i.reply({
                    content: `${client.allEmojis.x} **There is no other song before the current song.**`,
                    ephemeral: true,
                  });
                }
              }
              break;
            case "Pause":
              {
                if (newQueue.playing) {
                  await client.distube.pause(i.guild.id);
                  var data = receiveQueueData(
                    client.distube.getQueue(newQueue.id),
                    newQueue.songs[0]
                  );
                  currentSongPlayMsg.edit(data).catch((e) => {
                    //console.log(e.stack ? String(e.stack).grey : String(e).grey)
                  });
                  i.reply({
                    embeds: [
                      new MessageEmbed()
                        .setColor("#fffb00")
                        .setTimestamp()
                        .setTitle(`⏸ **Paused!**`)
                        .setFooter({
                          text: `💢 Action by: ${member.user.tag}`,
                          iconURL: member.user.displayAvatarURL({
                            dynamic: true,
                          }),
                        }),
                    ],
                  });
                } else {
                  await client.distube.resume(i.guild.id);
                  var data = receiveQueueData(
                    client.distube.getQueue(newQueue.id),
                    newQueue.songs[0]
                  );
                  currentSongPlayMsg.edit(data).catch((e) => {
                    //console.log(e.stack ? String(e.stack).grey : String(e).grey)
                  });
                  i.reply({
                    embeds: [
                      new MessageEmbed()
                        .setColor("#fffb00")
                        .setTimestamp()
                        .setTitle(`▶️ **Resumed!**`)
                        .setFooter({
                          text: `💢 Action by: ${member.user.tag}`,
                          iconURL: member.user.displayAvatarURL({
                            dynamic: true,
                          }),
                        }),
                    ],
                  });
                }
              }
              break;
            case "Next":
              {
                if (newQueue.songs.length == 0) {
                  i.reply({
                    embeds: [
                      new MessageEmbed()
                        .setColor("#fffb00")
                        .setTimestamp()
                        .setTitle(
                          `⏹ **Stopped playing and left the voice channel.**`
                        )
                        .setFooter({
                          text: `💢 Action by: ${member.user.tag}`,
                          iconURL: member.user.displayAvatarURL({
                            dynamic: true,
                          }),
                        }),
                    ],
                  });
                  await client.distube.stop(i.guild.id);
                  return;
                }
                //skip the track
                await client.distube.skip(i.guild.id);
                i.reply({
                  embeds: [
                    new MessageEmbed()
                      .setColor("#fffb00")
                      .setTimestamp()
                      .setTitle(`⏭ **Skipped to the next song!**`)
                      .setFooter({
                        text: `💢 Action by: ${member.user.tag}`,
                        iconURL: member.user.displayAvatarURL({
                          dynamic: true,
                        }),
                      }),
                  ],
                });
              }
              break;
            case "Stop":
              {
                i.reply({
                  embeds: [
                    new MessageEmbed()
                      .setColor("#fffb00")
                      .setTimestamp()
                      .setTitle(
                        `⏹ **Stopped playing and left the voice channel.**`
                      )
                      .setFooter({
                        text: `💢 Action by: ${member.user.tag}`,
                        iconURL: member.user.displayAvatarURL({
                          dynamic: true,
                        }),
                      }),
                  ],
                });
                await client.distube.stop(i.guild.id);
              }
              break;
            case "Shuffle":
              {
                client.maps.set(
                  `beforeshuffle-${newQueue.id}`,
                  newQueue.songs.map((track) => track).slice(1)
                );
                await newQueue.shuffle();
                i.reply({
                  embeds: [
                    new MessageEmbed()
                      .setColor("#fffb00")
                      .setTimestamp()
                      .setTitle(
                        `🔀 **Shuffled ${newQueue.songs.length} songs!**`
                      )
                      .setFooter({
                        text: `💢 Action by: ${member.user.tag}`,
                        iconURL: member.user.displayAvatarURL({
                          dynamic: true,
                        }),
                      }),
                  ],
                });
              }
              break;
            case "Forward":
              {
                let seektime = newQueue.currentTime + 10;
                if (seektime >= newQueue.songs[0].duration)
                  seektime = newQueue.songs[0].duration - 1;
                await newQueue.seek(Number(seektime));
                collector.resetTimer({
                  time:
                    (newQueue.songs[0].duration - newQueue.currentTime) * 1000,
                });
                i.reply({
                  embeds: [
                    new MessageEmbed()
                      .setColor("#fffb00")
                      .setTimestamp()
                      .setTitle(
                        `⏩ **Skipped forward in the song by \`10 seconds\`!**`
                      )
                      .setFooter({
                        text: `💢 Action by: ${member.user.tag}`,
                        iconURL: member.user.displayAvatarURL({
                          dynamic: true,
                        }),
                      }),
                  ],
                });
                var data = receiveQueueData(
                  client.distube.getQueue(newQueue.id),
                  newQueue.songs[0]
                );
                currentSongPlayMsg.edit(data).catch((e) => {
                  //console.log(e.stack ? String(e.stack).grey : String(e).grey)
                });
              }
              break;
            case "Rewind":
              {
                let seektime = newQueue.currentTime - 10;
                if (seektime < 0) seektime = 0;
                if (
                  seektime >=
                  newQueue.songs[0].duration - newQueue.currentTime
                )
                  seektime = 0;
                await newQueue.seek(Number(seektime));
                collector.resetTimer({
                  time:
                    (newQueue.songs[0].duration - newQueue.currentTime) * 1000,
                });
                i.reply({
                  embeds: [
                    new MessageEmbed()
                      .setColor("#fffb00")
                      .setTimestamp()
                      .setTitle(`⏪ **Rewinded the song by \`10 seconds\`!**`)
                      .setFooter({
                        text: `💢 Action by: ${member.user.tag}`,
                        iconURL: member.user.displayAvatarURL({
                          dynamic: true,
                        }),
                      }),
                  ],
                });
              }
              break;
          }
        });
      } catch (err) {
        console.log(err);
      }
    })
    .on(`addList`, (queue, playlist) => {
      queue.textChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#fffb00")
            .setThumbnail(
              playlist.thumbnail.url
                ? playlist.thumbnail.url
                : `https://img.youtube.com/vi/${playlist.songs[0].id}/mqdefault.jpg`
            )
            .setFooter({
              text: `💯` + playlist.user.tag,
              iconURL: playlist.user.displayAvatarURL({
                dynamic: true,
              }),
            })
            .setTitle(
              `<:Check:873399554555383849> Playlist added to the queue!`
            )
            .setDescription(
              `👍 Playlist: [\`${playlist.name}\`](${
                playlist.url ? playlist.url : ``
              })  -  \`${playlist.songs.length} Song${
                playlist.songs.length > 0 ? `s` : ``
              }\``
            )
            .addField(
              `⌛ Estimated Time:`,
              `\`${queue.songs.length - -playlist.songs.length} song${
                queue.songs.length > 0 ? `s` : ``
              }\` - \`${(
                Math.floor(((queue.duration - playlist.duration) / 60) * 100) /
                100
              )
                .toString()
                .replace(`.`, `:`)}\``
            )
            .addField(`🌀 Queue Duration:`, `\`${queue.formattedDuration}\``),
        ],
      });
    })
    .on(`error`, (channel, e) => {
      channel.send(`An error encountered: ${e}`).catch((e) => console.log(e));
      console.error(e);
    })
    .on(`finishSong`, (queue, song) => {
      var embed = new MessageEmbed()
        .setColor("#FFFB00")
        .setAuthor({
          name: `${song.name}`,
          iconURL: `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`,
          url: song.url,
        })
        .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        .setFooter({
          text: `⛔️ Song has ended!`,
        });
      queue.textChannel.messages
        .fetch(PlayerMap.get(`currentmsg`))
        .then((currentSongPlayMsg) => {
          currentSongPlayMsg
            .edit({ embeds: [embed], components: [] })
            .catch((e) => {});
        })
        .catch((e) => {});
    })
    .on("deleteQueue", (queue) => {
      if (!PlayerMap.has(`deleted-${queue.id}`)) {
        PlayerMap.set(`deleted-${queue.id}`, true);
        queue.textChannel.send({
          embeds: [
            new MessageEmbed()
              .setColor("#fffb00")
              .setFooter({
                text: client.user.username,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
              })
              .setTitle(`⛔️ Queue has been deleted!`)
              .setDescription(
                `This might have happened because the voice channel was empty, the bot was kicked from the voice channel, it was stopped by someone, or the queue ended.`
              )
              .setTimestamp(),
          ],
        });
      }
    });
};

function receiveQueueData(newQueue, newTrack) {
  if (!newQueue || !newTrack)
    return new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setTitle(`NO SONG FOUND?!?!`);
  var embed = new MessageEmbed()
    .setColor("#fffb00")
    .setAuthor({
      name: `${newTrack.name}`,
      iconURL: `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`,
      url: newTrack.url,
    })
    .setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
    .setFooter({
      text: `Requested by: ${newTrack.user.tag}`,
      iconURL: newTrack.user.displayAvatarURL({
        dynamic: true,
      }),
    });
  let previous = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("Previous")
    .setEmoji(`⏮️`);
  let pause = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("Pause")
    .setEmoji(`⏸️`);
  if (!newQueue.playing) {
    pause = pause.setStyle("SUCCESS").setEmoji("▶️");
  }
  let next = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("Next")
    .setEmoji("⏭️");
  let stop = new MessageButton()
    .setStyle("DANGER")
    .setCustomId("Stop")
    .setEmoji("⏹️");
  let shuffle = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("Shuffle")
    .setEmoji("🔀");
  let forward = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("Forward")
    .setEmoji("⏩")
    .setLabel(`+10s`);
  let rewind = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("Rewind")
    .setEmoji("⏪")
    .setLabel(`-10s`);
  if (Math.floor(newQueue.currentTime) < 10) {
    rewind = rewind.setDisabled();
  } else {
    rewind = rewind.setDisabled(false);
  }
  if (Math.floor(newTrack.duration - newQueue.currentTime) <= 10) {
    forward = forward.setDisabled();
  } else {
    forward = forward.setDisabled(false);
  }
  const row = new MessageActionRow().addComponents([
    previous,
    pause,
    next,
    stop,
    shuffle,
  ]);
  const row2 = new MessageActionRow().addComponents([forward, rewind]);
  return {
    embeds: [embed],
    components: [row, row2],
  };
}
