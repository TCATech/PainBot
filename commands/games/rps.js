const { Client, Message } = require("discord.js");
const { RockPaperScissors } = require("weky");

module.exports = {
  name: "rps",
  description: "Play rock paper scissors against someone else!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.mentions.users.first())
      return message.reply({
        content: "❌ Please mention an opponent!",
      });
    await RockPaperScissors({
      message: message,
      opponent: message.mentions.users.first(),
      gameID: message.author.id,
      embed: {
        title: "Rock Paper Scissors",
        description: `Press the button below to choose your element.`,
        color: message.color,
        footer: "Command powered by Weky",
        timestamp: true,
      },
      buttons: {
        rock: "Rock",
        paper: "Paper",
        scissors: "Scissors",
        accept: "Accept",
        deny: "Deny",
      },
      time: 15 * 1000,
      acceptMessage:
        "<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!",
      winMessage: "GG, <@{{winner}}> won!",
      drawMessage: "This game is deadlock!",
      endMessage: "<@{{opponent}}> didn't answer in time, so I ended the game!",
      timeEndMessage:
        "Both of you didn't pick something in time, so I ended the game!",
      cancelMessage:
        "<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!",
      choseMessage: "You picked {{emoji}}",
      noChangeMessage: "You cannot change your selection!",
      othersMessage: "Only {{author}} can use the buttons!",
      returnWinner: true,
    });
  },
};
