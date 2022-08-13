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
};
