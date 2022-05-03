const Schema = require("../models/chatbot");
const Chat = require("discord-chatbot");
const chatbot = new Chat({
  name: "Pain",
  gender: "Male",
});

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    Schema.findOne(
      {
        Guild: message.guild.id,
      },
      async (err, data) => {
        if (err) console.log(err);
        const channels = data.Channel.map((c) => {
          return c;
        });
        if (!data || !channels.includes(message.channel.id)) return;
        chatbot
          .chat(message.content)
          .then((response) =>
            message.reply({
              content: response
                .replace("Udit", "TCA")
                .replace("Paul", message.author.username),
            })
          )
          .catch((e) => console.log(e));
      }
    );
  });
};
