const { Client, Message } = require("discord.js");
const prefixModel = require("../models/prefix");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {Integer} int
   * @returns
   */
  prefix: async function (client, message, args, int) {
    const data = await prefixModel.findOne({
      Guild: message.guild.id,
    });
    if (!args[int]) return message.reply("Please specify the new prefix!");
    if (args[int].length > 5)
      return message.reply("Your new prefix must be under `5` characters!");
    if (data) {
      await prefixModel.findOneAndRemove({
        Guild: message.guild.id,
      });

      if (args[int] === client.config.prefix || args[int] === "reset") {
        message.reply(
          `PainBot's prefix is now back to the default which is \`${client.config.prefix}\`.`
        );

        let newData = new prefixModel({
          Prefix: client.config.prefix,
          Guild: message.guild.id,
        });
        return newData.save();
      }

      message.reply(`PainBot's prefix is now \`${args[int]}\`.`);

      let newData = new prefixModel({
        Prefix: args[int],
        Guild: message.guild.id,
      });
      newData.save();
    } else if (!data) {
      message.reply(`PainBot's prefix is now \`${args[int]}\`.`);
      let newData = new prefixModel({
        Prefix: args[int],
        Guild: message.guild.id,
      });
      newData.save();
    }
  },
};
