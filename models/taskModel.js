const mongoose = require('mongoose');
const Joi = require('joi');

// Define the Task schema with custom validation messages
const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Task name is required'],
            trim: true,
            minlength: [3, 'Task name can not be less than 3 characters'],
            maxlength: [20, 'Task name can not be more than 20 characters'],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

// Create the Task model
const Task = mongoose.model('Task', TaskSchema);

// Validation Create schema
const validateCreateTask = (task) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).trim().required().messages({
            'string.base': 'Task name must be a string',
            'string.empty': 'Task name is required',
            'string.min': 'Task name can not be less than 3 characters',
            'string.max': 'Task name can not be more than 20 characters',
        }),
    });

    return schema.validate(task);
};

// Validation Update schema
const validateUpdateTask = (task) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).trim().messages({
            'string.base': 'Task name must be a string',
            'string.empty': 'Task name is required',
            'string.min': 'Task name can not be less than 3 characters',
            'string.max': 'Task name can not be more than 20 characters',
        }),
        completed: Joi.boolean().messages({
            'boolean.base': 'Completed field must be a boolean value',
        }),
    });

    return schema.validate(task);
};

module.exports = {
    Task,
    validateCreateTask,
    validateUpdateTask,
};
