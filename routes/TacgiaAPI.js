const express = require('express');
const router = express.Router();
const TacGia = require("../models//Tacgia")

// lấy thông tin tác giả
router.get('/gettacgia',function(req,res){
    TacGia.find({},function(err,tacgia){
        if(err){
            res.send({result: -1, errMsg: err})
        }else{
            res.send({result: 1, TacGia: tacgia})
        }
    })
})
// thêm tác giả, pram: {MaTacGia. TenTacGia}
router.post('/addtacgia', function(req,res){
    TacGia.findOne({TenTacGia: req.body.TenTacGia},function(err,tacgia){
        if(err){
            res.send({err: -1, errMsg: err})
        }else{
            if(!tacgia){
                var newtacgia = new TacGia({
                    MaTacGia: req.body.MaTacGia,
                    TenTacGia: req.body.TenTacGia
                })
                newtacgia.save(function(err){
                    if(err){
                        res.send({result:-1, errMsg:err});
                    }else{
                        res.send({result:1, Msg:"Thêm tác giả thành công!",TacGia: newtacgia});
                    }
                })
            }else{
                res.json({result:-1, errMsg:"Tác giả đã tồn tại!"});
            }
        }
    })
})

module.exports = {
    routes: router
}