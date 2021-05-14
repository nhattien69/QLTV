const mongoose = require("mongoose");

const sinhvienSchema = new mongoose.Schema({
    HoTen:{
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        max: 255
    },
    MatKhau: {
        type: String,
        required: true,
        min: 6
    },
    Sodt: {
        type: String 
    },
    NgayLamThe: {
        type: String,
    },
    TinhTrang:{
        type: Boolean
    }
});

module.exports = mongoose.model("Sinhvien", sinhvienSchema);