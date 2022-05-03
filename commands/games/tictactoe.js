const { Client, Message } = require("discord.js");
const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe({ language: "en" });

module.exports = {
  name: "tictactoe",
  description: "Play TicTacToe against someone else, or with an AI.",
  aliases: ["ttt"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    game.handleMessage(message);
  },
};
