const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  /**
   *
   * @param {String} str
   * @returns {String}
   */
  escapeRegex: function (str) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
      console.log(e);
    }
  },
  /**
   *
   * @param {number} cur
   * @param {Array<EmbedBuilder>} embeds
   * @returns {ActionRowBuilder}
   */
  getRow: function (cur, embeds) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("prev")
        .setStyle(2)
        .setEmoji("994438542077984768")
        .setDisabled(cur === 0),
      new ButtonBuilder()
        .setCustomId("next")
        .setStyle(2)
        .setEmoji("994438540429643806")
        .setDisabled(cur === embeds.length - 1)
    );

    return row;
  },
  /**
   *
   * @param {String[]} words
   * @param {number} length
   * @returns {string}
   */
  getRandomWord: function (words, length) {
    const word = [];
    for (let i = 0; i < length; i++) {
      word.push(words[Math.floor(Math.random() * words.length)]);
    }
    return word;
  },
  duration: function (duration) {
    let time = parseDuration(duration);
    return formatTime(time);

    function parseDuration(duration) {
      let remain = duration;
      let days = Math.floor(remain / (1000 * 60 * 60 * 24));
      remain = remain % (1000 * 60 * 60 * 24);

      let hours = Math.floor(remain / (1000 * 60 * 60));
      remain = remain % (1000 * 60 * 60);

      let minutes = Math.floor(remain / (1000 * 60));
      remain = remain % (1000 * 60);

      let seconds = Math.floor(remain / 1000);
      remain = remain % 1000;

      let milliseconds = remain;

      return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      };
    }

    function formatTime(o, useMilli = false) {
      let parts = [];
      if (o.days) {
        let ret = o.days + " day";
        if (o.days !== 1) {
          ret += "s";
        }
        parts.push(ret);
      }
      if (o.hours) {
        let ret = o.hours + " hour";
        if (o.hours !== 1) {
          ret += "s";
        }
        parts.push(ret);
      }
      if (o.minutes) {
        let ret = o.minutes + " minute";
        if (o.minutes !== 1) {
          ret += "s";
        }
        parts.push(ret);
      }
      if (o.seconds) {
        let ret = o.seconds + " second";
        if (o.seconds !== 1) {
          ret += "s";
        }
        parts.push(ret);
      }
      if (parts.length === 0) {
        return "instantly";
      } else {
        return parts;
      }
    }
  },
};
