const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "setup-chatbot",
  description: "Setup the chatbot system for your server.",
  aliases: [
    "setupchatbot",
    "chatbot-setup",
    "chatbotsetup",
    "setup-aichat",
    "setupaichat",
    "aichat-setup",
    "aichatsetup",
  ],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var cmduser = message.author;
    begin();
    async function begin() {
      let menuoptions = [
        {
          value: "Enable Chatbot",
          description: `Enable/setup the chatbot system.`,
          emoji: "973400358061735987",
        },
        {
          value: "Disable Chatbot",
          description: `Disable the chatbot system.`,
          emoji: "973400416337403944",
        },
        {
          value: "Show Settings",
          description: `Show the current setup of the chatbot system.`,
          emoji: "📑",
        },
        {
          value: "Cancel",
          description: `Cancel the chatbot setup.`,
          emoji: "❌",
        },
      ];
      let Menu = new MessageSelectMenu()
        .setCustomId("SetupMenu")
        .setPlaceholder("Click me to setup the chatbot system...")
        .addOptions(
          menuoptions.map((option) => {
            let Obj = {
              label: option.label
                ? option.label.substring(0, 50)
                : option.value.substring(0, 50),
              value: option.value.substring(0, 50),
              description: option.description.substring(0, 50),
            };
            if (option.emoji) Obj.emoji = option.emoji;
            return Obj;
          })
        );

      let MenuEmbed = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor({
          name: "Chatbot",
          iconURL:
            "https://cdn.discordapp.com/emojis/771804364582420532.gif?size=96",
        })
        .setDescription(
          "***Select what you what you want to do using the `dropdown menu` below!***"
        );
      let menumsg = await message.reply({
        embeds: [MenuEmbed],
        components: [new MessageActionRow().addComponents(Menu)],
      });
      const collector = menumsg.createMessageComponentCollector({
        filter: (i) =>
          i?.isSelectMenu() &&
          i?.message.author.id == client.user.id &&
          i?.user,
        time: 90000,
      });

      collector.on("collect", (menu) => {
        if (menu?.user.id === cmduser.id) {
          collector.stop();
          let menuoptiondata = menuoptions.find(
            (v) => v.value == menu?.values[0]
          );
          if (menu?.values[0] == "Cancel") return menu?.reply("❌ Cancelled!");
          menu?.deferUpdate();
          let SetupNumber = menu?.values[0].split(" ")[0];
          handle_selection(menu?.values[0]);
        } else
          menu?.reply({
            content: `<:Cross:873399628500987945> You are not allowed to use that. Only <@${cmduser.id}> can.`,
            ephemeral: true,
          });
      });
      collector.on("end", (collected) => {
        menumsg.edit({
          embeds: [
            menumsg.embeds[0].setDescription(
              `~~${menumsg.embeds[0].description}~~`
            ),
          ],
          components: [],
          content: `${
            collected && collected.first() && collected.first().values
              ? `<:Check:873399554555383849> **Selected: \`${
                  collected ? collected.first().values[0] : "Nothing"
                }\`**`
              : "❌ **Nothing was selected. Cancelled.**"
          }`,
        });
      });
    }

    async function handle_selection(optionhandletype) {
      switch (optionhandletype) {
        case "Enable Chatbot":
          {
            var tempmsg = await message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle("What channel do you want to use?")
                  .setColor(client.config.color)
                  .setDescription(
                    "*Just ping the channel with #channel in this channel!*"
                  )
                  .setFooter({
                    text: client.user.username,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                  })
                  .setTimestamp(),
              ],
            });
            await tempmsg.channel
              .awaitMessages({
                filter: (m) => m.author.id == message.author.id,
                max: 1,
                time: 90000,
                errors: ["time"],
              })
              .then(async (collected) => {
                var message = collected.first();
                if (!message) return message.reply("No message sent.");
                let channel =
                  message.mentions.channels
                    .filter((ch) => ch.guild.id == message.guild.id)
                    .first() ||
                  message.guild.channels.cache.get(
                    message.content.trim().split(" ")[0]
                  );
                if (channel) {
                  client.settings.set(message.guild.id, channel.id, "chatbot");
                  return message.reply({
                    embeds: [
                      new MessageEmbed()
                        .setTitle(
                          `${channel.name} is now registered as a chatbot channel!`
                        )
                        .setDescription(
                          `You can now chat with me in <#${channel.id}>.`
                        )
                        .setColor(client.config.color)
                        .setFooter({
                          text: client.user.username,
                          iconURL: client.user.displayAvatarURL({
                            dynamic: true,
                          }),
                        })
                        .setTimestamp(),
                    ],
                  });
                } else {
                  return message.reply("NO CHANNEL PINGED");
                }
              });
          }
          break;
        case "Disable Chatbot":
          {
            client.settings.set(message.guild.id, "no", "chatbot");
            return message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle("<:Cross:873399628500987945> Chatbot disabled!")
                  .setColor(client.config.color)
                  .setDescription(`I will not respond to messages anymore.`)
                  .setFooter({
                    text: client.user.username,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                  })
                  .setTimestamp(),
              ],
            });
          }
          break;
        case "Show Settings":
          {
            let thesettings = client.settings.get(message.guild.id, "chatbot");
            return message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle("📑 Chatbot Settings")
                  .setColor(client.config.color)
                  .setDescription(
                    `**Channel:** ${
                      thesettings == "no"
                        ? "None"
                        : `<#${thesettings}> | \`${thesettings}\``
                    }`.substring(0, 2048)
                  )
                  .setFooter({
                    text: client.user.username,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                  })
                  .setTimestamp(),
              ],
            });
          }
          break;
      }
    }
  },
};
