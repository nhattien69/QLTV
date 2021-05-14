const mongoose = require("mongoose");

const nhaxuatbanSchema = new mongoose.Schema({
    MaNhaXuatBan:{
        type: String,
        required: true,
        max: 255
    },
    NhaXuatBan:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Nhaxuatban", nhaxuatbanSchema);