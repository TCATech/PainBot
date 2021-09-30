const client = require("../index");
const prefixModel = require("../models/prefix");

client.on("messageCreate", async (message) => {
  const data = await prefixModel.findOne({
    Guild: message.guild.id,
  });

  let prefix = "";

  if (data) {
    prefix = data.Prefix;
  } else if (!data) {
    prefix = client.config.prefix;
  }

  message.prefix = prefix;

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(prefix)
  )
    return;

  message.color =
    message.guild.me.displayHexColor === "#000000"
      ? "#ffffff"
      : message.guild.me.displayHexColor;

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;
  await command.run(client, message, args);
});
