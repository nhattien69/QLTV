const mongoose = require("mongoose");

const tacgiaSchema = new mongoose.Schema({
    MaTacGia:{
        type: String,
        required: true,
        max: 255
    },
    TenTacGia:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Tacgia", tacgiaSchema);