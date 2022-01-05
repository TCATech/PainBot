const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.reply({
        content: `❌ There was an error trying to do that command!\n \`404: Command doesn't exist\``,
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
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    interaction.color = "#FFFB00";

    try {
      cmd.run(client, interaction, args);
    } catch (err) {
      interaction.reply({
        content: `❌ There was an error trying to do that command!\n \`${err}\``,
        ephemeral: true,
      });
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    const command = client.slashCommands.get(interaction.commandName);
    if (command) {
      try {
        command.run(client, interaction);
      } catch (err) {
        interaction.reply({
          content: `❌ There was an error trying to do that command!\n \`${err}\``,
          ephemeral: true,
        });
      }
    }
  }
});
