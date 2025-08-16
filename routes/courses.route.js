
const express = require('express')
const router = express.Router();
const coursesController = require('../controllers/courses.controller');
const validation = require('../middleware/validation');


//! get all courses
router.get('/' , coursesController.getCourses)



//! create course 
router.post('/',  validation(), coursesController.addCourse);



router.route('/:courseId')
            .get( coursesController.getCourse)
            .patch( coursesController.updateCourse)
            .delete( coursesController.deleteCourse)




module.exports = router;