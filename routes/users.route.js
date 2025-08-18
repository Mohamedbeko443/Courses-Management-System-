
const express = require('express')
const router = express.Router();

const multer = require("multer");


const diskStorage = multer.diskStorage({
    destination : function(req , file , cb){
        console.log("file" , file);
        cb(null , "uploads");
    },
    filename : function(req , file , cb){
        const fileName = `user-${Date.now()}`;
        cb(null , fileName)
    }
})

const upload = multer({storage: diskStorage})


const usersController = require("../controllers/users.controller");
const verifyToken = require("../middleware/auth");



router.route('/')
            .get(verifyToken , usersController.getAllUsers)
            

router.route("/register")
            .post( upload.single("avatar") ,usersController.register)


router.route("/login")
            .post(usersController.login)


module.exports = router;