const { Client, Message, MessageAttachment } = require("discord.js");
const pop = require("popcat-wrapper");

module.exports = {
  name: "facts",
  description: "That man is spitting facts!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const fact = args.join(" ");
    if (!fact)
      return message.reply({
        content: "❌ Please specify a fact.",
      });

    const res = await pop.facts(fact);
    const img = new MessageAttachment(res, "facts.png");

    message.reply({
      files: [img],
    });
  },
};
