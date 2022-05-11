const { getRandomWord } = require("../../utils/functions");
const { ChaosWords } = require("weky");
const { Client, Message } = require("discord.js");

module.exports = {
  name: "chaos",
  description: "Try to find words in a sea of random letters!",
  aliases: ["cw", "words", "chaoswords", "word"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await ChaosWords({
      message,
      embed: {
        title: "Chaos Words",
        description: `${message.author} has **{{time}}** to find the hidden words in the sentence below.`,
        color: client.config.color,
        field1: "Sentence:",
        field2: "Words Found/Remaining Words:",
        field3: "Words found:",
        field4: "Words:",
        footer: "Command powered by Weky",
        timestamp: true,
      },
      winMessage: `GG, ${message.author}! You found all the hidden words in **{{time}}**.`,
      loseMessage: `Better luck next time, ${message.author}!`,
      wrongWordMessage: `Wrong guess! You have **{{remaining_tries}}** tries left, ${message.author}.`,
      correctWordMessage: `GG, **{{word}}** was correct! You have to find **{{remaining}}** more word(s), ${message.author}`,
      time: 60000,
      words: getRandomWord(Math.floor(Math.random() * 6) + 2),
      charGenerated: 17,
      maxTries: 5,
      buttonText: "Cancel",
      othersMessage: "Only <@{{author}}> can use the cancel button!",
    });
  },
};
