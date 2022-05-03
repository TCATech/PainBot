const {glob} = require("glob");
const {promisify} = require("util");
const {Client} = require("discord.js");
const mongoose = require("mongoose");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = {directory, ...file};
      client.commands.set(file.name, properties);
    }
  });

  // Slash commands
  const slashCommands = await globPromise(
    `${process.cwd()}/slashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    const guild = client.guilds.cache.get(client.config.guild);
    if (guild) {
      console.log("Guild found, loading slash commands for it...");
      await guild.commands.set(arrayOfSlashCommands);
      console.log("Done!");
    } else {
      console.log("Guild not found, loading slash commands globally...");
      await client.application.commands.set(arrayOfSlashCommands);
      console.log("Done! Slash commands will show up in an hour or so.");
    }
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Features
  // const readFeatures = (dir) => {
  //   const files = fs.readdirSync(path.join(__dirname, dir));
  //   for (const file of files) {
  //     const stat = fs.lstatSync(path.join(__dirname, dir, file));
  //     if (stat.isDirectory()) {
  //       readFeatures(path.join(dir, file));
  //     } else {
  //       const feature = require(path.join(__dirname, dir, file));
  //       feature(client);
  //     }
  //   }
  // };

  // readFeatures("../features/");

  // MongoDB
  const mongoURI = process.env.mongoURI;
  if (!mongoURI) return;

  mongoose.connect(mongoURI).then(() => console.log("Connected to MongoDB"));
};
