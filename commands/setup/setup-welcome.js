const { Client, Message } = require("discord.js");

module.exports = {
  name: "setup-welcome",
  description:
    "Setup the welcomer system for your server, so that new members can be welcomed.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var cmduser = message.author;
    begin();
    async function begin() {
      let menuoptions = [
        {
          value: "Enable Welcomer",
          description: `Enable/setup the welcomer system.`,
          emoji: "973400358061735987",
        },
        {
          value: "Disable Welcomer",
          description: `Disable the welcomer system.`,
          emoji: "973400416337403944",
        },
        {
          value: "Show Settings",
          description: `Shows the current setup of the welcomer system.`,
          emoji: "📑",
        },
        {
          value: "Cancel",
          description: `Cancel the welcomer setup.`,
          emoji: "❌",
        },
      ];
    }
  },
};
