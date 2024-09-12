const asyncHandler = require('express-async-handler');
const {Task, validateCreateTask, validateUpdateTask} = require('../models/taskModel');

/****************************
 *  @desc    Get All Task
 *  @route   /api/v1/task
 *  @method  GET
 *  @access  public
 ****************************/
const getAllTasks = asyncHandler(async (req, res) => {
    const allTasks = await Task.find({}).select('-__v');

    res.status(200).json({
        status: 'success',
        length: allTasks.length,

        allTasks,
        // length: allTasks.length,
        // data: {
        //     allTasks,
        // },
    });
});

/****************************
 *  @desc    Get Task By ID
 *  @route   /api/v1/task/:id
 *  @method  GET
 *  @access  public
 ****************************/
const getTask = asyncHandler(async (req, res) => {
    const taskID = req.params.id;
    const singleTask = await Task.findById(taskID).select('-__v');

    if (!singleTask) {
        return res.status(404).json({
            status: 'fail',
            message: `Task not found for ID: ${taskID}`,
        });
    }

    res.status(200).json({
        status: 'success',
        singleTask,
    });
});

/****************************
 *  @desc    Create New Task
 *  @route   /api/v1/task
 *  @method  POST
 *  @access  public
 ****************************/
const createTask = asyncHandler(async (req, res) => {
    const {error} = validateCreateTask(req.body);

    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }

    const newTask = await Task.create({
        name: req.body.name,
        completed: req.body.completed,
    });

    res.status(201).json({
        status: 'success',
        newTask,
    });
});

/****************************
 *  @desc    Update Task
 *  @route   /api/v1/task/:id
 *  @method  PATCH
 *  @access  public
 ****************************/
const updateTask = asyncHandler(async (req, res) => {
    const {error} = validateUpdateTask(req.body);

    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }

    const taskID = req.params.id;
    const updateData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskID, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Validate the update
    });

    if (!updatedTask) {
        return res.status(404).json({
            status: 'fail',
            message: `Task not found for ID: ${taskID}`,
        });
    }

    res.status(200).json({
        status: 'success',
        updatedTask,
    });
});

/****************************
 *  @desc    Delete Task
 *  @route   /api/v1/task/:id
 *  @method  DELETE
 *  @access  public
 ****************************/
const deleteTask = asyncHandler(async (req, res) => {
    const taskID = req.params.id;
    const deleteTask = await Task.findByIdAndDelete(taskID);

    if (!deleteTask) {
        return res.status(404).json({
            status: 'fail',
            message: `Task not found for ID: ${taskID}`,
        });
    }

    res.status(204).json({
        status: 'success',
    });
});

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask,
};
