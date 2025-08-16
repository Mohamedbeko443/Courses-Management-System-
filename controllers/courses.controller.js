const { validationResult } = require('express-validator')
const Course = require("../models/course.model")
const httpStatusText = require('../utils/httpStatusText')
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require("../utils/errorBoundary")

// db functions and operators 

const getCourses = asyncWrapper(
    async (req, res) => {
    const {limit = 2  , page = 1} = req.query;
    
    let skip = (page - 1) * limit;
    const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip)
    res.json({status : httpStatusText.SUCCESS , data :  {courses} });
}
)



const getCourses2 = async (req, res) => {
    const {limit = 2  , page = 1} = req.query;
    
    let skip = (page - 1) * limit;
    const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip)
    res.json({status : httpStatusText.SUCCESS , data :  {courses} });
}


const getCourse = asyncWrapper(
    async (req, res, next) => {

        const course = await Course.findById(req.params.courseId);
        if (!course)
        {
            const error =  appError.create("course NOT found!",404,httpStatusText.FAIL);
            return next(error);
        }

        return res.status(200).json({status : httpStatusText.SUCCESS , data :  {course}});

}
)


const getCourse2 = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course)
            return res.status(404).json({status : httpStatusText.FAIL, data : {course: null}});

        return res.status(200).json({status : httpStatusText.SUCCESS , data :  {course}});
    }
    catch (err) {
        return res.status(400).json({ status : httpStatusText.ERROR, code: 400 ,data : null, message: err.message});
    }

}


const addCourse = asyncWrapper(
    async (req, res , next) => {
    const data = req.body;
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
        const error = appError.create(errs.array(), 400 , httpStatusText.FAIL );
        return  next(error);
    }

    const newCourse = new Course(data);
    await newCourse.save();

    res.status(201).json({status : httpStatusText.SUCCESS , data:{course :newCourse}});
}
)


const addCourse2 = async (req, res) => {
    const data = req.body;
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
        return res.status(400).json({status : httpStatusText.FAIL,data:errs.array() });
    }

    const newCourse = new Course(data);
    await newCourse.save();

    res.status(201).json({status : httpStatusText.SUCCESS , data:{course :newCourse}});
}



const updateCourse = asyncWrapper(
    async (req , res) => {
        const updatedCourse = await Course.updateOne({ _id: req.params.courseId }, { $set: { ...req.body } });
        return res.status(200).json({status:httpStatusText.SUCCESS , data:{course:updatedCourse}});
}
)


const updateCourse2 = async (req , res) => {
    try {
        const updatedCourse = await Course.updateOne({ _id: req.params.courseId }, { $set: { ...req.body } });
        return res.status(200).json({status:httpStatusText.SUCCESS , data:{course:updatedCourse}});
    }
    catch (err) {
        return res.status(400).json({status : httpStatusText.ERROR , data: null , message: err.message })
    }
}


const deleteCourse = asyncWrapper(
    async (req, res) => {
        await Course.deleteOne({ _id: req.params.courseId })
        return res.status(200).json({ status : httpStatusText.SUCCESS , data : null });
}
)


const deleteCourse2 = async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.params.courseId })
        return res.status(200).json({ status : httpStatusText.SUCCESS , data : null });
    }
    catch (err) {
        return res.status(400).json({ msg: "Invalid course id!" });
    }
}


module.exports = {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}

