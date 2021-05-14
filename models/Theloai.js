const mongoose = require("mongoose");

const theloaiSchema = new mongoose.Schema({
    MaTheLoai:{
        type: String,
        required: true,
        max: 255
    },
    TheLoai:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Theloai", theloaiSchema);