
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');
const validation = require('../middleware/validation');
const verifyToken = require("../middleware/auth");


//! get all courses
router.get('/' , coursesController.getCourses)



//! create course 
router.post('/', verifyToken ,   validation(), coursesController.addCourse);



router.route('/:courseId')
            .get( coursesController.getCourse)
            .patch( coursesController.updateCourse)
            .delete( coursesController.deleteCourse)




module.exports = router;