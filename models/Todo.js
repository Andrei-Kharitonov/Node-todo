let { Schema, model } = require("mongoose")

let schema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = model("Todo", schema)