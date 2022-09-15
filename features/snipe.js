module.exports = (client) => {
  client.on("messageDelete", (message) => {
    if (message.author.bot || !message.guild) return;

    let snipes = client.snipes.get(message.channel.id) || [];
    if (snipes.length > 1) snipes = snipes.shift();

    snipes.unshift({
      msg: message,
      image: message.attachments.first()?.proxyURL || null,
      time: Date.now(),
    });

    client.snipes.set(message.channel.id, snipes);
  });
};
