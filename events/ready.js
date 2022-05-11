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

  console.log("\n");
  console.log(
    `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`
      .bold.brightGreen
  );
  console.log(
    `     ┃ `.bold.brightGreen +
      " ".repeat(-1 + 69 - ` ┃ `.length) +
      "┃".bold.brightGreen
  );
  console.log(
    `     ┃ `.bold.brightGreen +
      `${client.user.tag} is now online!`.bold.brightGreen +
      " ".repeat(
        -1 + 69 - ` ┃ `.length - `${client.user.tag} is now online!`.length
      ) +
      "┃".bold.brightGreen
  );
  console.log(
    `     ┃ `.bold.brightGreen +
      " ".repeat(-1 + 69 - ` ┃ `.length) +
      "┃".bold.brightGreen
  );
  console.log(
    `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
      .bold.brightGreen
  );
});
