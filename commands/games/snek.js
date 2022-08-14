const { Client, Message } = require("discord.js");
const { Snake } = require("@nottca/weky");

module.exports = {
  name: "snek",
  aliases: ["snake"],
  description: "Just your regular old snake, but in Discord!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await Snake({
      message: message,
      embed: {
        title: "Snake",
        color: client.config.color,
      },
      emojis: {
        empty: "⬛",
        snakeBody: "🟢",
        food: "🍎",
        up: "⬆️",
        right: "⬅️",
        down: "⬇️",
        left: "➡️",
      },
    });
  },
};
