const { Client, Message } = require("discord.js");
const { Calculator } = require("weky");

module.exports = {
  name: "calc",
  description: "Calculate some math problems in Discord!",
  aliases: ["calculator"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await Calculator({
      message,
      embed: {
        title: "Calculator",
        color: message.color,
        footer: "Command powered by Weky",
        timestamp: true,
      },
      disabledQuery: "Calculator is disabled!",
      invalidQuery: "The provided equation is invalid!",
      othersMessage: "Only <@{{author}}> can use the calculator!",
    });
  },
};
