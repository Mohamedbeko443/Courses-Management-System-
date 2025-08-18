
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');
const validation = require('../middleware/validation');
const verifyToken = require("../middleware/auth");
const roles = require("../utils/roles");
const allowedTo = require("../middleware/allowedTo");


//! get all courses
router.get('/' , coursesController.getCourses)



//! create course 
router.post('/', verifyToken ,   validation(), coursesController.addCourse);



router.route('/:courseId')
            .get( coursesController.getCourse)
            .patch( coursesController.updateCourse)
            .delete(verifyToken , allowedTo(roles.ADMIN , roles.MANAGER) ,   coursesController.deleteCourse)




module.exports = router;