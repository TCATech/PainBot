const client = require("../index");

client.on("ready", () => {
  setInterval(() => {
    const list = [
      ">help | PainBot.tk",
      `${client.users.cache.size} users | PainBot.tk`,
      `${client.guilds.cache.size} servers | PainBot.tk`,
      `${client.channels.cache.size} channels | PainBot.tk`,
    ];
    const randomStatus = list[Math.floor(Math.random() * list.length)];
    let statusType = "WATCHING";
    if (randomStatus === ">help | PainBot.tk") {
      statusType = "LISTENING";
    }

    client.user.setActivity(randomStatus, { type: statusType });
  }, 10000);

  console.log(`${client.user.tag} is now online!`);

  require("../dashboard")(client);
});
