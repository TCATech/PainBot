const { MessageEmbed } = require("discord.js");
const client = require("../index");
const prefixModel = require("../models/prefix");

client.on("messageCreate", async (message) => {
  const data = await prefixModel.findOne({
    Guild: message.guild.id,
  });

  let prefix = "";

  if (data) {
    prefix = data.Prefix;
  } else if (!data) {
    prefix = client.config.prefix;
  }

  message.prefix = prefix;

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(prefix)
  )
    return;

  message.color =
    message.guild.me.displayHexColor === "#000000"
      ? "#ffffff"
      : message.guild.me.displayHexColor;

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;

  try {
    const userPermsEmbed = new MessageEmbed()
      .setTitle("Oopsie Poopsie!")
      .setDescription(
        `You need the following permissions to use this command: \`${command.userPerms
          .map(
            (value) =>
              `${
                value[0].toUpperCase() +
                value.toLowerCase().slice(1).replace(/_/gi, " ")
              }`
          )
          .join(", ")}\``
      )
      .setColor(message.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    const botPermsEmbed = new MessageEmbed()
      .setTitle("Oopsie Poopsie!")
      .setDescription(
        `Please give me the following permissions: \`${command.botPerms
          .map(
            (value) =>
              `${
                value[0].toUpperCase() +
                value.toLowerCase().slice(1).replace(/_/gi, " ")
              }`
          )
          .join(", ")}\``
      )
      .setColor(message.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    if (command.userPerms && !message.member.permissions.has(command.userPerms))
      return message.reply({
        embeds: [userPermsEmbed],
      });

    if (command.botPerms && !message.guild.me.permissions.has(command.botPerms))
      return message.reply({
        embeds: [botPermsEmbed],
      });

    await command.run(client, message, args);
  } catch (err) {
    message.reply({
      content: `❌ There was an error trying to do that command!\n \`${err}\``,
    });
  }
});
