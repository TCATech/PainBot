const { Client, Message } = require("discord.js");
const { Snake } = require("weky");

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
        color: message.color,
        footer: "Command powered by Weky",
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
