const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema({
  image : String
},{timestamps  : true})

module.exports= mongoose.model("ImageDetails", ImageDetailsScehma);
