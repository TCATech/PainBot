const {
  Client,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
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
      let Menu = new SelectMenuBuilder()
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

      let MenuEmbed = new EmbedBuilder()
        .setColor(client.config.color)
        .setAuthor({
          name: "Chatbot",
          iconURL:
            "https://cdn.discordapp.com/emojis/771804364582420532.gif?size=96",
        })
        .setDescription(
          "***Select what you what you want to do using the `dropdown menu` below!***"
        );
      const menumsg = await message.reply({
        embeds: [MenuEmbed],
        components: [new ActionRowBuilder().addComponents(Menu)],
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
          if (menu?.values[0] == "Cancel")
            return menu.message.edit({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`✅ Success!`)
                  .setDescription(`The chatbot setup has been cancelled.`)
                  .setColor(client.config.color),
              ],
              components: [],
            });
          menu?.deferUpdate();
          let SetupNumber = menu?.values[0].split(" ")[0];
          handle_selection(menu.message, menu?.values[0]);
        }
      });
    }

    async function handle_selection(menumsg, optionhandletype) {
      switch (optionhandletype) {
        case "Enable Chatbot":
          {
            menumsg.edit({
              embeds: [
                new EmbedBuilder()
                  .setTitle("What channel do you want to use?")
                  .setDescription(
                    "*Just ping the channel with #channel in this channel!*"
                  )
                  .setColor(client.config.color),
              ],
              components: [],
            });
            await message.channel
              .awaitMessages({
                filter: (m) => m.author.id == message.author.id,
                max: 1,
                time: 90000,
                errors: ["time"],
              })
              .then(async (collected) => {
                var message = collected.first();
                let channel =
                  message.mentions.channels
                    .filter((ch) => ch.guild.id == message.guild.id)
                    .first() ||
                  message.guild.channels.cache.get(
                    message.content.trim().split(" ")[0]
                  );
                message.delete();
                if (channel) {
                  client.settings.set(message.guild.id, channel.id, "chatbot");
                  return menumsg.edit({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(`✅ Success!`)
                        .setDescription(
                          `The chatbot system is now enabled!\n>>> You can now chat with me in <#${channel.id}>.`
                        )
                        .setColor(client.config.color),
                    ],
                  });
                } else {
                  return menumsg.edit({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle("❌ A channel was not pinged.")
                        .setColor("Red"),
                    ],
                  });
                }
              });
          }
          break;
        case "Disable Chatbot": {
          client.settings.set(message.guild.id, "no", "chatbot");
          return menumsg.edit({
            embeds: [
              new EmbedBuilder()
                .setTitle(`✅ Success!`)
                .setDescription(`The chatbot system is now disabled.`)
                .setColor(client.config.color),
            ],
            components: [],
          });
        }
        case "Show Settings": {
          let thesettings = client.settings.get(message.guild.id, "chatbot");
          return menumsg.edit({
            embeds: [
              new EmbedBuilder()
                .setTitle("📑 Chatbot Settings")
                .setColor(client.config.color)
                .setDescription(
                  `**Channel:** ${
                    thesettings == "no"
                      ? "None"
                      : `<#${thesettings}> | \`${thesettings}\``
                  }`.substring(0, 2048)
                ),
            ],
            components: [],
          });
        }
      }
    }
  },
};
