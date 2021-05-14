const express = require('express');
const router = express.Router();
const Sach = require("../models/Sach")
const TacGia = require("../models//Tacgia")
const TheLoai = require("../models/Theloai")
const NhaXuatBan = require("../models/Nhaxuatban")

// lấy thông tin tất cả sách
router.get('/getsach',function(req,res){
    Sach.find({}).populate('TacGia').populate('TheLoai').populate('NhaXuatBan').exec(function (err, sach) {
        if(err){
            res.send({result:-1, errMsg:err});
        }else{
            res.send({result: 1, Sach: sach});
        }
  });
})

// lấy thông tin 1 sách
router.get('/getonesach/:id',function(req,res){
    Sach.findOne({MaSach:req.params.id}).populate('TacGia').populate('TheLoai').populate('NhaXuatBan').exec(function (err, sach) {
        if(err){
            res.send({result:-1, errMsg:err});
        }else{
            res.send({result: 1, Sach: sach});
        }
  });
})

// thêm sách, pram: {MaSach ,TacGia: _id bảng TacGia,TheLoai: _id bảng TheLoai,
            //NhaXuatBan _id bảng NhaXuatBan, TenSach ,MoTa ,NamSanXuat ,HinhAnh: URL }
router.post('/addsach', async (req,res) => {
    const sachExist = await Sach.findOne({MaSach: req.body.MaSach});
    if(sachExist) return res.send({result:-1, errMsg:"Sách đã tồn tại"});
    try{
        const tacgia = await TacGia.findOne({_id: req.body.TacGia})
        const theloai = await TheLoai.findOne({_id: req.body.TheLoai})
        const nxb = await NhaXuatBan.findOne({_id: req.body.NhaXuatBan})
        const sach = new Sach({
            MaSach: req.body.MaSach,
            TacGia: tacgia,
            TheLoai: theloai,
            NhaXuatBan: nxb,
            TenSach: req.body.TenSach,
            MoTa: req.body.MoTa,
            NamSanXuat: req.body.NamSanXuat,
            HinhAnh: req.body.HinhAnh
        });

        try{
            const savesach = await sach.save();   
            res.send({result:1, Msg:"Thêm mới sách thành công",sach: savesach});
        }catch(err){
            res.send({result:-1, errMsg:err});
        }
    }catch(err){
        res.send({result:-1, errMsg:err});
    }   
})
module.exports = {
    routes: router
}