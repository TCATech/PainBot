const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get a list of commands or info about a specific command.",
  run: async (client, message, args) => {
    if (args[0]) {
      const command =
        client.commands.get(args[0]) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(args[0])
        );

      if (!command || command.directory === "owner") {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("❌ Command not found.")
              .setColor(client.config.color),
          ],
        });
      }

      const embed = new EmbedBuilder().setColor(client.config.color);

      if (command.name) {
        embed.setTitle(`Information about \`${command.name}\``);
        embed.addFields({
          name: "Command",
          value: "```" + client.config.prefix + command.name + "```",
        });
      }

      if (command.description)
        embed.addFields({
          name: "Description",
          value: "```" + command.description + "```",
        });
      else
        embed.addFields({
          name: "Description",
          value: "```No description available.```",
        });

      if (command.userPerms)
        embed.addFields({
          name: "Permissions",
          value:
            "```" +
            command.userPerms
              .map(
                (value) =>
                  `${
                    value[0].toUpperCase() +
                    value
                      .toLowerCase()
                      .slice(1)
                      .replace(/_/gi, " ")
                      .replace("guild", "server")
                  }`
              )
              .join(", ") +
            "```",
        });

      if (command.aliases)
        embed.addFields({
          name: "Aliases",
          value: "```" + command.aliases.join(", ") + "```",
        });

      if (command.usage) {
        embed.addFieldss({
          name: "Usage",
          value: `\`\`\`${message.prefix}${command.name} ${command.usage}\`\`\``,
        });
        embed.setFooter({
          text: "<> = required, [] = optional",
        });
      }

      message.channel.send({
        embeds: [embed],
      });
    } else {
      const categories = require("fs").readdirSync("./commands/");

      const embeds = [];
      const commands = (category) => {
        return client.commands
          .filter((cmd) => cmd.directory === category)
          .map((cmd) => `\`${cmd.name}\``);
      };
      for (let i = 0; i < categories.length; i += 1) {
        const current = categories[i];
        if (current === "owner") continue;
        const items = commands(current);

        const embed = new EmbedBuilder()
          .setColor(client.config.color)
          .setTitle("HELP MENU 🔰")
          .setDescription(
            `To see more information for a specific command, type: \`${message.prefix}help [command]\`.`
          )
          .addFields({
            name: `${current.toUpperCase()} [${items.length}]`,
            value: `> ${items.sort((a, b) => a.localeCompare(b)).join(", ")}`,
          })
          .setThumbnail(client.user.displayAvatarURL());
        embeds.push(embed);
      }

      const prev = new ButtonBuilder()
        .setCustomId("previous")
        .setEmoji("994438542077984768")
        .setStyle(2);
      const next = new ButtonBuilder()
        .setCustomId("next")
        .setEmoji("994438540429643806")
        .setStyle(2);

      let cur = 0;

      await message.channel.send({
        embeds: [embeds[0]],
        components: [new ActionRowBuilder().addComponents(prev, next)],
      });

      const filter = (i) => i.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: 2,
      });

      collector.on("collect", (i) => {
        if (i.customId === "previous") {
          if (cur !== 0) {
            cur -= 1;
            i.update({
              embeds: [embeds[cur]],
            });
          } else if (cur > embeds.length) {
            cur = 0;
            i.update({
              embeds: [embeds[cur]],
            });
          } else {
            cur = embeds.length - 1;
            i.update({
              embeds: [embeds[cur]],
            });
          }
        } else if (i.customId === "next") {
          if (cur < embeds.length - 1) {
            cur += 1;
            i.update({
              embeds: [embeds[cur]],
            });
          } else {
            cur = 0;
            i.update({
              embeds: [embeds[cur]],
            });
          }
        }
      });
    }
  },
};
