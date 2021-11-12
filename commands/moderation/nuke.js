const { Client, Message } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "nuke",
  description: "Nukes an entire channel and deletes all of it's messages.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  userPerms: ["MANAGE_MESSAGES"],
  botPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    const messages = await message.channel.messages.fetch();

    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days") && !msg.pinned
    );

    message.channel.bulkDelete(filtered);

    message
      .reply("Deleted all of the messages in this channel!")
      .then((v) => v.delete({ timeout: 4000 }));
  },
};
