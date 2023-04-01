const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const inventoriesSchema = new Schema({
  _id: Schema.Types.Number,
  sku: Schema.Types.String,
  description: Schema.Types.String,
  instock: Schema.Types.Number,
});

const inventoriesModel = mongoose.model("inventories", inventoriesSchema);
module.exports = inventoriesModel;
