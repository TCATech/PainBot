const { MessageEmbed } = require("discord.js");
const client = require("../index");
const { escapeRegex } = require("../utils/functions");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  client.settings.ensure(message.guild.id, {
    prefix: client.config.prefix,
    chatbot: "no",
  });

  message.prefix = client.settings.get(message.guild.id, "prefix");

  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(message.prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;

  const [, mPrefix] = message.content.match(prefixRegex);

  message.color = client.config.color;

  const [cmd, ...args] = message.content
    .slice(mPrefix.length)
    .trim()
    .split(/ +/);

  if (cmd.length === 0) {
    if (mPrefix.includes(client.user.id)) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Hey there!")
            .setDescription(
              "My prefix in this server is `" +
                message.prefix +
                "`. Use `" +
                message.prefix +
                "help` to see all of my commands!"
            )
            .setColor(client.config.color)
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
      });
    }
  }

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;

  try {
    if (
      command.userPerms &&
      !message.member.permissions.has(command.userPerms)
    ) {
      const userPermsEmbed = new MessageEmbed()
        .setTitle("Uh oh!")
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
        .setColor(client.config.color)
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      return message.reply({
        embeds: [userPermsEmbed],
      });
    }

    if (
      command.botPerms &&
      !message.guild.me.permissions.has(command.botPerms)
    ) {
      const botPermsEmbed = new MessageEmbed()
        .setTitle("Uh oh!")
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
        .setColor(client.config.color)
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      return message.reply({
        embeds: [botPermsEmbed],
      });
    }

    await command.run(client, message, args);
  } catch (err) {
    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Uh oh!")
          .setDescription("An error has occured.")
          .addField("Error", err.toString())
          .setColor(client.config.color)
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  }
});
