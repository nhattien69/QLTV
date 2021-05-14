const express = require('express');
const router = express.Router();
const NhaXuatBan = require("../models/Nhaxuatban")

//lấy thông tin nxb
router.get('/getnxb',function(req,res){
    NhaXuatBan.find({},function(err,nxb){
        if(err){
            res.send({result: -1, errMsg: err})
        }else{
            res.send({result: 1, NhaXuatBan: nxb})
        }
    })
})
// thêm nxb, pram: {MaNhaXuatBan, NhaXuatBan}
router.post('/addnxb', function(req,res){
    NhaXuatBan.findOne({NhaXuatBan: req.body.NhaXuatBan},function(err,nxb){
        if(err){
            res.send({err: -1, errMsg: err})
        }else{
            if(!nxb){
                var newnxb = new NhaXuatBan({
                    MaNhaXuatBan: req.body.MaNhaXuatBan,
                    NhaXuatBan: req.body.NhaXuatBan
                })
                newnxb.save(function(err){
                    if(err){
                        res.send({result:-1, errMsg:err});
                    }else{
                        res.send({result:1, Msg:"Thêm nhà xuất bản thành công!",NXB: newnxb});
                    }
                })
            }else{
                res.json({result:-1, errMsg:"Nhà xuất bản đã tồn tại!"});
            }
        }
    })
})


module.exports = {
    routes: router
}