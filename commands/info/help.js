const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const categoryList = require("../../categories.json");

module.exports = {
  name: "help",
  description: "stop it. get some help.",
  aliases: ["h", "halp"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (args[0]) {
      const command =
        client.commands.get(args[0]) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(args[0])
        );
      if (!command) {
        const category = client.categories.find(
          (category) => category === args[0]
        );
        if (!category) {
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setTitle("Uh oh!")
                .setDescription("That command or category doesn't exist!")
                .setColor("RED")
                .setFooter({
                  text: client.user.username,
                  iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp(),
            ],
          });
        }
        const embed = new MessageEmbed()
          .setTitle(
            `${categoryList.names[category]} commands [${client.commands
              .filter((cmd) => cmd.directory === category)
              .size.toLocaleString()}]`
          )
          .setDescription(
            client.commands
              .filter((cmd) => cmd.directory === category)
              .map((cmd) => `\`${cmd.name}\``)
              .join(" ")
          )
          .setColor(message.color)
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();

        return message.reply({
          embeds: [embed],
        });
      }

      const embed = new MessageEmbed()
        .setColor(message.color)
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      if (command.name) {
        embed.setTitle(`Information about ${command.name}`);
        embed.addField(
          "Command",
          "```" + message.prefix + command.name + "```"
        );
      }

      if (command.description)
        embed.addField("Description", "```" + command.description + "```");
      else embed.addField("Description", "```No description available.```");

      if (command.userPerms)
        embed.addField(
          "Permissions",
          "```" + command.userPerms.join(", ") + "```"
        );

      if (command.aliases)
        embed.addField("Aliases", "```" + command.aliases.join(", ") + "```");

      if (command.usage) {
        embed.addField(
          "Usage",
          `\`\`\`${message.prefix}${command.name} ${command.usage}\`\`\``
        );
        embed.setFooter({
          text: "<> = required, [] = optional",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });
      }

      message.reply({
        embeds: [embed],
      });
    } else {
      const directories = [
        ...new Set(client.commands.map((cmd) => cmd.directory)),
      ];

      /**
       *
       * @param {String} str
       * @returns string
       */
      const formatString = (str) =>
        `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

      const categories = directories.map((dir) => {
        const getCommands = client.commands
          .filter((cmd) => cmd.directory === dir)
          .map((cmd) => {
            return {
              name: cmd.name || "???",
              description:
                cmd.description || "No description for this command.",
            };
          });

        return {
          directory: formatString(dir),
          commands: getCommands,
        };
      });

      const embed = new MessageEmbed()
        .setTitle("Oh you need some help?")
        .setDescription(
          "Please choose a category using the dropdown menu below. If you want more help with a specific command, use `" +
            message.prefix +
            "help [command]`."
        )
        .setColor(message.color)
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      /**
       *
       * @param {Boolean} state
       * @returns MessageActionRow
       */
      const components = (state) => [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("help-menu")
            .setPlaceholder("Select a category...")
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  emoji: categoryList.emojis[cmd.directory.toLowerCase()],
                  description: `Commands from the ${cmd.directory} category`,
                };
              })
            )
        ),
      ];

      const init = await message.reply({
        embeds: [embed],
        components: components(false),
      });

      const filter = (int) => int.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
        time: 30 * 1000,
      });

      collector.on("collect", (int) => {
        const [directory] = int.values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );

        const categoryEmbed = new MessageEmbed()
          .setTitle(
            `${categoryList.names[directory]} commands [${client.commands
              .filter((cmd) => cmd.directory === directory)
              .size.toLocaleString()}]`
          )
          .setDescription(
            client.commands
              .filter((cmd) => cmd.directory === directory)
              .map((cmd) => `\`${cmd.name}\``)
              .join(" ")
          )
          .setColor(message.color)
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();

        int.update({ embeds: [categoryEmbed] });
      });

      collector.on("end", () => {
        init.edit({
          content:
            "You ran out of time! Do `" + message.prefix + "help` again.",
          components: components(true),
        });
      });
    }
  },
};
