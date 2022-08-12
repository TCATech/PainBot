const fs = require("fs");

module.exports = (client) => {
  fs.readdirSync("./commands").forEach((dir) => {
    const commandFiles = fs
      .readdirSync(`./commands/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      let pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        const properties = { directory: dir, ...pull };
        client.commands.set(pull.name, properties);
      } else continue;
    }
  });
};
