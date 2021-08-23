const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = {
  adminModel,
};
