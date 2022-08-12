module.exports = (client) => {
  console.log(`${client.user.tag} should now be online!`);

  client.startTime = Date.now();
};
