const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema({
    MaSach:{
        type: String,
        required: true,
        max: 255
    },
    TacGia:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: "Tacgia",
    },
    TheLoai:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: "Theloai",
    },
    NhaXuatBan:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: "Nhaxuatban",
    },
    TenSach:{
        type: String,
        required: true,
        max: 255
    },
    MoTa:{
        type: String,
        required: true
    },
    NamSanXuat:{
        type: Date,
        required: true
    },
    HinhAnh:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Sach", sachSchema);