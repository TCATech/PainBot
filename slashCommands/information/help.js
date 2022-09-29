const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getRow } = require("../../utils/functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of commands or info about a specific command.")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("The command to get information about.")
        .setRequired(false)
    ),
  run: async (client, interaction) => {
    const arg = interaction.options.getString("command");
    if (arg) {
      const command =
        client.commands.get(arg) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(arg));

      if (!command || command.directory === "owner") {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("❌ Command not found.")
              .setColor(client.config.color),
          ],
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder().setColor(client.config.color);

      if (command.name) {
        embed.setTitle(`Information about \`${command.name}\``);
        embed.addFields({
          name: "Command",
          value:
            "```" +
            client.settings.get(interaction.guild.id, "prefix") +
            command.name +
            "```",
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
        embed.addFields({
          name: "Usage",
          value: `\`\`\`${client.settings.get(interaction.guild.id, "prefix")}${
            command.name
          } ${command.usage}\`\`\``,
        });
        embed.setFooter({
          text: "<> = required, [] = optional",
        });
      }

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
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
            `To see more information for a specific command, type: \`${client.settings.get(
              interaction.guild.id,
              "prefix"
            )}help [command]\`.`
          )
          .addFields({
            name: `${current.toUpperCase()} [${items.length}]`,
            value: `> ${items.sort((a, b) => a.localeCompare(b)).join(", ")}`,
          })
          .setThumbnail(client.user.displayAvatarURL());
        embeds.push(embed);
      }

      let cur = 0;

      const res = await interaction.reply({
        embeds: [embeds[0]],
        components: [getRow(cur, embeds)],
        ephemeral: true,
        fetchReply: true,
      });

      const filter = (i) =>
        i.user.id === interaction.member.id && i.message.id === res.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
      });

      collector.on("collect", (i) => {
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
