const { EmbedBuilder } = require("discord.js");
const { escapeRegex } = require("../utils/functions");

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;

  client.settings.ensure(message.guild.id, {
    prefix: client.config.prefix,
  });

  message.prefix = client.settings.get(message.guild.id, "prefix");

  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(message.prefix)})\\s*`
  );

  if (!prefixRegex.test(message.content)) return;

  const [, mPrefix] = message.content.match(prefixRegex);

  const [cmd, ...args] = message.content
    .slice(mPrefix.length)
    .trim()
    .split(/ +/);

  if (cmd.length === 0 && mPrefix.includes(client.user.id)) {
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("👋 Hey there!")
          .setDescription(
            `My prefix here is \`${message.prefix}\`. Use \`${message.prefix}help\` to see my commands.`
          )
          .setColor(client.config.color),
      ],
    });
  }

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;

  try {
    if (command.userPerms && !message.member.permissions.has(command.userPerms))
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ You do not have permission to use this command!")
            .setColor("Red"),
        ],
      });

    await command.run(client, message, args);
  } catch (err) {
    console.log(err);
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("❌ An error occurred!")
          .setDescription(`\`\`\`${err}\`\`\``)
          .setColor("Red"),
      ],
    });
  }
};
