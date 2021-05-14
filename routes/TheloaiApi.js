const express = require('express');
const router = express.Router();
const TheLoai = require("../models/Theloai")

// lấy thông tin thể loại
router.get('/gettheloai',function(req,res){
    TheLoai.find({},function(err,theloai){
        if(err){
            res.send({result: -1, errMsg: err})
        }else{
            res.send({result: 1, TheLoai: theloai})
        }
    })
})
//thêm thể loại, pram: {MaTheLoai, TheLoai}
router.post('/addtheloai', function(req,res){
    TheLoai.findOne({TheLoai: req.body.TheLoai},function(err,theloai){
        if(err){
            res.send({err: -1, errMsg: err})
        }else{
            if(!theloai){
                var newtheloai = new TheLoai({
                    MaTheLoai: req.body.MaTheLoai,
                    TheLoai: req.body.TheLoai
                })
                newtheloai.save(function(err){
                    if(err){
                        res.send({result:-1, errMsg:err});
                    }else{
                        res.send({result:1, Msg:"Thêm thể loại thành công!",TheLoai: newtheloai});
                    }
                })
            }else{
                res.json({result:-1, errMsg:"Thể loại đã tồn tại!"});
            }
        }
    })
})

module.exports = {
    routes: router
}