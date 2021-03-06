const Chat = require("discord-chatbot");
const chatbot = new Chat({
  name: "Pain",
  gender: "Male",
});

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    // Schema.findOne(
    //   {
    //     Guild: message.guild.id,
    //   },
    //   async (err, data) => {
    //     if (err) console.log(err);
    //     if (!data || !data.Channel.includes(message.channel.id)) return;
    //     chatbot
    //       .chat(message.content)
    //       .then((response) =>
    //         message.reply({
    //           content: response
    //             .replace("Udit", "TCA")
    //             .replace("Paul", message.author.username),
    //         })
    //       )
    //       .catch((e) => console.log(e));
    //   }
    // );
    client.settings.ensure(message.guild.id, {
      chatbot: "no",
    });
    const channel = client.settings.get(message.guild.id, "chatbot");
    if (!channel || channel === "no" || channel !== message.channel.id) return;

    chatbot
      .chat(message.content)
      .then((response) => {
        message.reply({
          content: response.replace("Udit", "TCA"),
        });
      })
      .catch((e) => console.log(e));
  });
};
