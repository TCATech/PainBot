const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatbot")
    .setDescription("Setup the chatbot system for your server.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("enable")
        .setDescription("Enable the chatbot system.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel to setup the chatbot system in.")
            .setRequired(true)
            .addChannelTypes(0)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("disable")
        .setDescription("Disable the chatbot system.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("settings")
        .setDescription("Shows the current settings of the chatbot.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  run: async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "enable": {
        const channel = interaction.options.getChannel("channel");

        if (!channel)
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("❌ That channel no longer exists.")
                .setColor("Red"),
            ],
            ephemeral: true,
          });

        client.settings.set(interaction.guild.id, channel.id, "chatbot");

        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`✅ Success!`)
              .setDescription(
                `The chatbot system is now enabled!\n>>> You can now chat with me in <#${channel.id}>.`
              )
              .setColor(client.config.color),
          ],
          ephemeral: true,
        });
      }
      case "disable": {
        client.settings.set(interaction.guild.id, "no", "chatbot");
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`✅ Success!`)
              .setDescription(`The chatbot system is now disabled.`)
              .setColor(client.config.color),
          ],
          ephemeral: true,
        });
      }
      case "settings": {
        let thesettings = client.settings.get(interaction.guild.id, "chatbot");

        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("📑 Chatbot Settings")
              .setColor(client.config.color)
              .setDescription(
                `**Channel:** ${
                  thesettings == "no"
                    ? "None"
                    : `<#${thesettings}> | \`${thesettings}\``
                }`.substring(0, 2048)
              ),
          ],
          ephemeral: true,
        });
      }
    }
  },
};
