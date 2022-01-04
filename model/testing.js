const mongoose = require("mongoose");
const testing_Schema = mongoose.Schema({
    name:  { type : String },
    image: { type : String },
    index: { type : Number },
    Sno: { type : Number },
    attributes: { type: Array }
})

const testing_DataModel = mongoose.model("tests", testing_Schema);
module.exports = testing_DataModel;