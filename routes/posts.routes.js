const postRouter= require("express").Router()
const controller= require('../controller/posts.controller')
const multer= require("multer")
const path= require("path")

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename(req, file, cb) {
      cb(
        null,
        file.fieldname +
          "-" +
          Date.now() +
          "myimg" +
          path.extname(file.originalname)
      );
    },
  });

const maxSize= 1*1024*1024

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if(file.mimetype == "image/jpg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg"){
        cb(null,true)
        }else{
          cb(null,false)
          return cb(new Error('only jpg,png,jpeg type are allow'))
        }
    },
    limits: maxSize
  });

postRouter.post('/post',upload.single('image'),controller.postCreate)
postRouter.get('/allPostGet',controller.allPostGet)
postRouter.get('/:id',controller.singlePostGet)
postRouter.delete('/:id',controller.postDelete)
postRouter.put('/:id',controller.postUpdate)
module.exports= postRouter;