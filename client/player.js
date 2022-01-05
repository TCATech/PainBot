const { Player } = require("discord-player");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../index");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: true,
  autoSelfDeaf: true,
});

player.on("error", (queue, err) => {
  queue.metadata.send({
    content: `❌ Whoops, an error occured!\n \`${err}\``,
  });
});

player.on("connectionError", (queue, err) => {
  queue.metadata.send({
    content: `❌ There was an error trying to connect to your voice channel!\n \`${err}\``,
  });
});

player.on("trackStart", (queue, track) => {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("previous")
      .setEmoji("⏮️")
      .setStyle("SECONDARY"),
    new MessageButton()
      .setCustomId("pauseplay")
      .setEmoji("⏸️")
      .setStyle("PRIMARY"),
    new MessageButton().setCustomId("next").setEmoji("⏭️").setStyle("SECONDARY")
  );
  queue.metadata.send({
    embeds: [
      new MessageEmbed()
        .setTitle("<:1048_blobheadphones:927561924428857384> | Now Playing")
        .setDescription(`${track.title}`)
        .setColor("#FFFB00")
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp(),
    ],
    components: [row],
  });
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "previous") {
        try {
          await queue.back();
        } catch {
          return interaction.reply({
            content: "❌ There isn't a song before the currently playing song.",
            ephemeral: true,
          });
        }
      } else if (interaction.customId === "next") {
        try {
          await queue.skip();
        } catch {
          return interaction.reply({
            content: "❌ There isn't a song after the currently playing song.",
            ephemeral: true,
          });
        }
      } else if (interaction.customId === "pauseplay") {
        if (queue.connection.paused === true) {
          await queue.setPaused(false);
          interaction.update({
            embeds: [
              new MessageEmbed()
                .setTitle(
                  "<:1048_blobheadphones:927561924428857384> | Now Playing"
                )
                .setDescription(`${track.title}`)
                .setColor("#FFFB00")
                .setFooter({
                  text: client.user.username,
                  iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp(),
            ],
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId("previous")
                  .setEmoji("⏮️")
                  .setStyle("SECONDARY"),
                new MessageButton()
                  .setCustomId("pauseplay")
                  .setEmoji("⏸️")
                  .setStyle("PRIMARY"),
                new MessageButton()
                  .setCustomId("next")
                  .setEmoji("⏭️")
                  .setStyle("SECONDARY")
              ),
            ],
          });
        } else if (queue.connection.paused === false) {
          await queue.setPaused(true);
          interaction.update({
            embeds: [
              new MessageEmbed()
                .setTitle(
                  "<:1048_blobheadphones:927561924428857384> | Now Playing"
                )
                .setDescription(`${track.title}`)
                .setColor("#FFFB00")
                .setFooter({
                  text: client.user.username,
                  iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp(),
            ],
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId("previous")
                  .setEmoji("⏮️")
                  .setStyle("SECONDARY"),
                new MessageButton()
                  .setCustomId("pauseplay")
                  .setEmoji("▶️")
                  .setStyle("SECONDARY"),
                new MessageButton()
                  .setCustomId("next")
                  .setEmoji("⏭️")
                  .setStyle("SECONDARY")
              ),
            ],
          });
        }
      }
    }
  });
});

player.on("botDisconnect", (queue) => {
  queue.metadata.send({
    embeds: [
      new MessageEmbed()
        .setTitle("⏹ | Queue deleted")
        .setDescription(
          "I got disconnected from the voice channel so I have cleared the queue.."
        )
        .setColor("#FFFB00")
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp(),
    ],
  });
});

player.on("channelEmpty", (queue) => {
  queue.metadata.send({
    embeds: [
      new MessageEmbed()
        .setTitle("⏹ | Queue deleted")
        .setDescription(
          "The voice channel I'm in has nobody in it, so I have cleared the queue."
        )
        .setColor("#FFFB00")
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp(),
    ],
  });
});

module.exports = player;
