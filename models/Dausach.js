const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const dausachSchema = new mongoose.Schema({
    MaSach:{
        type: mongoose.Schema.Types.ObjectId, ref: "Sach",
        required: true
    },
    MaDauSach:{
        type: Number
    },
    TinhTrang:{
        type: String,
        required: true,
        max: 255
    },
    GhiChu:{
        type: String
    }
});
dausachSchema.plugin(autoIncrement,{inc_field:'MaDauSach',reference_value:'MaSach'});

module.exports = mongoose.model("Dausach", dausachSchema);