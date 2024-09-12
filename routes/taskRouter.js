const express = require('express');
const {getAllTasks, createTask, getTask, updateTask, deleteTask} = require('../controllers/taskController');
const router = express.Router();


// /api/v1/task
router.route('/').get(getAllTasks).post(createTask);

// /api/v1/task/:id
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
