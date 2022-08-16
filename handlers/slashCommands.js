const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = async (client) => {
  const commands = [];

  fs.readdirSync("./slashCommands/").forEach((dir) => {
    const slashCommandFiles = fs
      .readdirSync(`./slashCommands/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of slashCommandFiles) {
      const command = require(`../slashCommands/${dir}/${file}`);
      commands.push(command.data.toJSON());
      client.slashCommands.set(command.data.toJSON().name, command);
    }
  });

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

  client.on("ready", async () => {
    const deploySlashGlobally =
      process.env.DEPLOY_SLASH_GLOBALLY === "false" ? false : true;
    await rest.put(
      deploySlashGlobally
        ? Routes.applicationCommands(client.user.id)
        : Routes.applicationGuildCommands(
            client.user.id,
            client.config.guildId
          ),
      {
        body: commands,
      }
    );
  });
};
