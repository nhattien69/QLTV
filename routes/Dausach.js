const express = require('express');
const router = express.Router();
const Sach = require("../models/Sach")
const DauSach = require("../models/Dausach")

// lấy tất cả đầu sách
router.get('/getdausach',async(req,res)=>{
    DauSach.find({}).populate('MaSach').exec(function (err, dausach) {
        if(err){
            res.send({result:-1, errMsg:err});
        }else{
            res.send({result: 1, DauSach: dausach});
        }
  });
})

// lấy đầu sách của 1 sách, :id = MaSach 
router.get('/getsachs/:id',async(req,res)=>{
    DauSach.find({MaSach:req.params.id}).populate('MaSach').exec(function (err, dausach) {
        if(err){
            res.send({result:-1, errMsg:err});
        }else{
            res.send({result: 1, DauSach: dausach});
        }
  });
})

// thêm đầu sách, pram: {MaSach: _id bảng Sách, TinhTrang, GhiChu}
router.post('/adddausach',async(req,res)=>{
    try{
        const sach = await Sach.findOne({_id: req.body.MaSach})
        const dausach = new DauSach({
            MaSach: sach,
            TinhTrang: req.body.TinhTrang,
            GhiChu: req.body.GhiChu
        });
        try{
            const savedausach = await dausach.save();   
            res.send({result:1, Msg:"Thêm mới đầu sách thành công",dausach: savedausach});
        }catch(err){
            res.send({result:-1, errMsg:err});
        }
    }catch(err){
        res.send({result:-1, errMsg:err});
    }
})

// update sách, pram: {MaSach, MaDauSach, TinhTrang, GhiChu}
router.post('/updatedausach',async(req,res)=>{
    /* try{
        const dausach = await DauSach.findOneAndUpdate({MaSach: req.body.MaSach, MaDauSach: req.body.MaDauSach},{
            TinhTrang: req.body.TinhTrang,
            GhiChu: req.body.GhiChu
        })
        res.send({result: 1,Msg:"Cập nhật đầu sách thành công",DauSach: dausach});
    }catch(err){
        res.send({result:-1, errMsg:err});
    } */
    DauSach.findOneAndUpdate({MaSach: req.body.MaSach, MaDauSach: req.body.MaDauSach},{
        TinhTrang: req.body.TinhTrang,
        GhiChu: req.body.GhiChu
    },function(err,dausach){
        if(err){
            res.send({result:-1, errMsg:err});
        }else{
            res.send({result:1,Msg:"Cập nhật đầu sách thành công",DauSach: dausach});
        }
    })
})

module.exports = {
    routes: router
}