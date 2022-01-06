const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.reply({
        content: `❌ There was an error trying to do that command!\n \`404: Command no longer exists\``,
        ephemeral: true,
      });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    // interaction.member = interaction.guild.members.cache.get(
    //   interaction.user.id
    // );

    interaction.color = "#FFFB00";

    try {
      if (
        command.userPerms &&
        !interaction.member.permissions.has(command.userPerms)
      ) {
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
        cmd.botPerms &&
        !interaction.guild.me.permissions.has(command.botPerms)
      ) {
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
          .setFooter({
            text: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();

        return message.reply({
          embeds: [botPermsEmbed],
        });
      }

      cmd.run(client, interaction, args);
    } catch (err) {
      interaction.reply({
        content: `❌ There was an error trying to do that command!\n \`${err}\``,
        ephemeral: true,
      });
    }
  }
});
