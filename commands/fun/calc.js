const { Calculator } = require("@nottca/weky");

module.exports = {
  name: "calc",
  description: "Calculate some math problems in Discord!",
  aliases: ["calculator"],
  run: async (client, message, args) => {
    await Calculator({
      message,
      embed: {
        title: "Calculator",
        color: client.config.color,
      },
      disabledQuery: "Calculator is disabled!",
      invalidQuery: "The provided equation is invalid!",
      othersMessage: "Only <@{{author}}> can use the calculator!",
    });
  },
};
