const { words } = require("../../utils/words");
const { FastType } = require("weky");
const { Client, Message } = require("discord.js");

module.exports = {
  name: "fasttype",
  description: "Try typing a simple word as fast as you can!",
  aliases: ["ft", "fast", "type"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const word =
      args.join(" ") || words[Math.floor(Math.random() * words.length)];
    await FastType({
      message: message,
      embed: {
        title: "FastType",
        description: `**${message.author}** has **{{time}}** to type the word below.`,
        color: message.color,
        footer: "Command powered by Weky",
        timestamp: true,
      },
      sentence: word,
      winMessage: `GG, **${message.author}**! You had a WPM of **{{wpm}}** and finished in **{{time}}**.`,
      loseMessage: `Better luck next time, **${message.author}**!`,
      cancelMessage: "You ended the game!",
      time: 10 * 1000,
      buttonText: "Cancel",
      othersMessage: "Only <@{{author}}> can use the cancel button!",
    });
  },
};
