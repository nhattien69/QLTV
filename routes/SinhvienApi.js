const express = require('express');
const router = express.Router();
const SinhVien = require("../models/Sinhvien")

// lấy thoogn tin tất cả SV
router.get('/getsinhvien',function(req,res){
    SinhVien.find({},function(err,sinhvien){
        if(err){
            res.send({err: -1, errMsg: err})
        }else{
            res.send({result:1,acount: sinhvien});
        }
    })
})
// thêm sinh viên, pram: {HoTen, Email, MatKhau, ReMatKhau, Sodt}
router.post('/addsinhvien',function(req,res){
    SinhVien.findOne({Email:req.body.Email},function(err,sinhvien){
        if(err){
            res.send({err: -1, errMsg: err})
        }else{
            //chua co tai khoan
            if(!sinhvien){
                //check mat khau
                if(req.body.MatKhau != req.body.ReMatKhau){
                    res.send({result:-1, errMsg:"Mật khẩu không khớp!"});
                }else{
                    var newsv = new SinhVien({
                        HoTen: req.body.HoTen,
                        Email: req.body.Email,
                        MatKhau: req.body.MatKhau,
                        Sodt: req.body.Sodt,
                        NgayLamThe: Date.now(),
                        TinhTrang: true
                    });
                    newsv.save(function(err){
                        if(err){
                            res.send({result:-1, errMsg:err});
                        }else{
                            res.send({result:1, Msg:"Đăng kí tài khoản thành công",acount: newsv});
                        }
                    })
                }
            }else{
                res.send({result:-1, errMsg:"Người dùng đã tồn tại"});
            }
        }
    })
})
// cập nhật SV, pram: {Email, HoTen, Sodt, TinhTrang}
router.post('/updatesinhvien',function(req,res){
    SinhVien.findOneAndUpdate({Email:req.body.Email},{
        HoTen: req.body.HoTen,
        Sodt: req.body.Sodt,
        TinhTrang: req.body.TinhTrang
    },function(err,sinhvien){
        if(err){
            res.send({result:-1, errMsg:err});
        }else{
            res.send({result:1,Msg:"Cập nhật tài khoản thành công",acount: sinhvien});
        }
    })
})
// đăng nhập SV, pram: {Email, MatKhau}
router.post('/sinhvien/login',function(req,res){
    SinhVien.findOne(({Email: req.body.Email}),function(err,sinhvien){
        if(err || !sinhvien){
            res.send({result: -1, errMsg:"Chưa có tài khoản"})
        }else{
            if(sinhvien.TinhTrang==false){
                res.send({result: -1, errMsg:"Tài khoản chưa kích hoạt"})
            }else{
                if(req.body.MatKhau!=sinhvien.MatKhau){
                    res.send({result:-1, errMsg:"Sai Mật khẩu."});
                }else{
                    res.send({result:1})
                }
            }
        }
    })
})
module.exports = {
    routes: router
}