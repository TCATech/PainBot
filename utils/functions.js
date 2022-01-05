const { words } = require("./words");

module.exports = {
  getRandomWord: function (length) {
    const word = [];
    for (let i = 0; i < length; i++) {
      word.push(words[Math.floor(Math.random() * words.length)]);
    }
    return word;
  },
};
