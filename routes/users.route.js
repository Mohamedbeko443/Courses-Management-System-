
const express = require('express')
const router = express.Router();

const usersController = require("../controllers/users.controller");
const verifyToken = require("../middleware/auth");

// get all users 
// register 
// login


 

router.route('/')
            .get(verifyToken , usersController.getAllUsers)
            

router.route("/register")
            .post(usersController.register)


router.route("/login")
            .post(usersController.login)


module.exports = router;