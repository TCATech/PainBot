const Chat = require("discord-chatbot");
const chatbot = new Chat({
  name: "PainBot",
  gender: "male",
});

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
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
