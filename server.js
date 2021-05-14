var express = require("express");
var app = express();

const cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://builamnhattien:nhattien69999@cluster0.qr7vk.mongodb.net/QLTV?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},function(err){
    if(err){
        console.log("Mongoose connected err:" +err)
    }else
    {
        console.log("Mongoose connected successfully")
    }
});

const sinhvien = require('./routes/SinhvienApi');
const nhaxuatban = require('./routes/NhaXuatBanApi');
const tacgia = require('./routes/TacgiaAPI');
const theloai = require('./routes/TheloaiApi');
const sach = require('./routes/SachApi');
const dausach = require('./routes/Dausach');
app.use('/api', sinhvien.routes);
app.use('/api', nhaxuatban.routes);
app.use('/api', tacgia.routes);
app.use('/api', theloai.routes);
app.use('/api', sach.routes);
app.use('/api', dausach.routes)

app.listen(process.env.PORT || 3000)