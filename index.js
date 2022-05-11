// Bot client

const { Client, Collection } = require("discord.js");
const Enmap = require("enmap");
var colors = require("colors");
require("dotenv/config");
const client = new Client({
  intents: 32767,
  restTimeOffset: 0,
  allowedMentions: {
    repliedUser: false,
  },
});
module.exports = client;

client.config = require("./config");
client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.categories = require("fs").readdirSync(`./commands`);
client.maps = new Map();
client.settings = new Enmap({
  name: "settings",
  dataDir: "./databases/settings",
});

require("./handler")(client);

console.log("\n");
console.log(
  `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`
    .bold.brightRed
);
console.log(
  `     ┃ `.bold.brightRed +
    " ".repeat(-1 + 69 - ` ┃ `.length) +
    "┃".bold.brightRed
);
console.log(
  `     ┃ `.bold.brightRed +
    "Loading the bot...".bold.brightRed +
    " ".repeat(-1 + 69 - ` ┃ `.length - "Loading the bot...".length) +
    "┃".bold.brightRed
);
console.log(
  `     ┃ `.bold.brightRed +
    " ".repeat(-1 + 69 - ` ┃ `.length) +
    "┃".bold.brightRed
);
console.log(
  `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
    .bold.brightRed
);
client.login(process.env.TOKEN);

// DisTube client

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

client.distube = new DisTube(client, {
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  youtubeDL: false,
  updateYouTubeDL: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

require("./handler/distubeEvents")(client);
