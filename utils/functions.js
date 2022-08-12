module.exports = {
  escapeRegex: function (str) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
      console.log(e);
    }
  },
};
