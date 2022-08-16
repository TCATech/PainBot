const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ Unknown command.")
            .setDescription(
              `Use \`${message.prefix}help\` to see all my commands.`
            )
            .setColor("Red"),
        ],
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

    try {
      await cmd.run(client, interaction, args);
    } catch (err) {
      console.log(err);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ An error occurred!")
            .setDescription(`\`\`\`${err}\`\`\``)
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }
  }
};
