const {
  Client,
  Interaction,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "stop it. get some help.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, interaction) => {
    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.directory)),
    ];

    /**
     *
     * @param {String} str
     * @returns string
     */
    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands
        .filter((cmd) => cmd.directory === dir)
        .map((cmd) => {
          return {
            name: cmd.name || "???",
            description: cmd.description || "no description for this command",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new MessageEmbed()
      .setTitle("Please choose a category using the dropdown menu below.")
      .setColor(interaction.color)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    /**
     *
     * @param {Boolean} state
     * @returns MessageActionRow
     */
    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Category...")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands from the ${cmd.directory} category`,
              };
            })
          )
      ),
    ];

    const init = await interaction.reply({
      embeds: [embed],
      components: components(false),
      fetchReply: true,
    });

    const filter = (int) => int.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 30 * 1000,
    });

    collector.on("collect", (int) => {
      const [directory] = int.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new MessageEmbed()
        .setTitle(`${formatString(directory)} commands`)
        .setDescription(
          `Here is a list of commands from the ${directory} category.`
        )
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: cmd.description,
              inline: true,
            };
          })
        )
        .setColor(interaction.color)
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      interaction.editReply({ embeds: [categoryEmbed] });
      return int.reply({
        content: `✅ Changed category to ${formatString(directory)}`,
        ephemeral: true,
      });
    });

    collector.on("end", () => {
      interaction.editReply({
        components: components(true),
      });
    });
  },
};
