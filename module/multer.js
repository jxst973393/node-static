/**
 * @author:水痕
 * @time:2017-07-16 16:25
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:multer
 * @title:封装上传文件的
 */
'use strict';
//引入安装的multer模块
const multer = require("multer");
//node自带的path模块
const path = require("path");

//定义上传路径处理及上传之后重命名
let storage = multer.diskStorage({
    destination: path.join(process.cwd(), "public/upload"), //上传文件保存到项目中的文件夹
    filename: function (req, file, callback) {
        /**
         * file可以获取到上传文件的文件名，文件类型
         * cb是回调函数
         */
        console.log(file);
        //根据当前直接蹉重命名上传文件
        let filename = (file.originalname).split(".");
        callback(null, `${Date.now()}.${filename[filename.length-1]}` )
    }
});
//上传文件格式限制
let fileFilter = function (req,file,cb){
    // 当设置这个判断后  没允许的 && 没设置的类型 拒绝
    if(file.mimetype === 'image/jpeg' || file.mimetype === "image/png" || file.mimetype === "image/gif"){
        cb(null,true)
    }else{
        cb(null,false)
    }
};

let upload = multer({
    storage: storage,
    fileFilter:fileFilter,
    limits:{

    }
});

module.exports = upload;