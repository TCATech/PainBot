const { EmbedBuilder } = require("discord.js");
const { getRow } = require("../../utils/functions");

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
        return message.reply({
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
          value: "```" + message.prefix + command.name + "```",
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
          value: "```" + command.userPerms.join(", ") + "```",
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

      message.reply({
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
          .setTitle(`HELP MENU 🔰 (Page ${i + 1}/${categories.length})`)
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

      let cur = 0;

      const res = await message.reply({
        embeds: [embeds[0]],
        components: [getRow(cur, embeds)],
      });

      const filter = (i) =>
        i.user.id === message.member.id && i.message.id === res.id;
      const collector = message.channel.createMessageComponentCollector({
        filter,
      });

      collector.on("collect", (i) => {
        if (!i) return;

        if (i.customId !== "prev" && i.customId !== "next") return;

        if (i.customId === "prev" && cur > 0) {
          cur -= 1;
          i.update({
            embeds: [embeds[cur]],
            components: [getRow(cur, embeds)],
          });
        } else if (i.customId === "next" && cur < embeds.length - 1) {
          cur += 1;
          i.update({
            embeds: [embeds[cur]],
            components: [getRow(cur, embeds)],
          });
        }
      });
    }
  },
};
