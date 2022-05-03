const {Schema, model} = require("mongoose");

module.exports = model(
  "chatbot",
  new Schema({
    Channel: Array,
    Guild: String,
  })
);
