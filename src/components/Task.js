import React, { useState } from 'react';
import Button from './Button';
// import { validateTask } from '../utils/validation';


const Task = ({ task, onEdit, onRemove, dayId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    const [errors, setErrors] = useState({});


    // Handle input changes for editing task
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    // Save edited task with validation
    const saveEdit = () => {
        // Validation could be extracted to a utility file if needed
        if (!validateTask(editedTask)) {
            alert('Invalid task data.');
            return; // Stop function if the task is invalid
        }

        onEdit(dayId, task.id, editedTask);
        setIsEditing(false);
    };


    // Cancel editing
    const cancelEdit = () => {
        setEditedTask({ ...task });
        setIsEditing(false);
    };

    // Define the validation for the edited task
    const validateTask = (taskToValidate) => {
        const errors = {};

        if (!taskToValidate.title.trim()) {
            errors.title = 'Title is required';
        } else if (taskToValidate.title.trim().length < 3 || taskToValidate.title.trim().length > 50) {
            errors.title = 'Title must be between 3 and 50 characters';
        }

        if (!taskToValidate.startTime) {
            errors.startTime = 'Start time is required';
        } else if (!isValidTime(taskToValidate.startTime)) {
            errors.startTime = 'Start time must be in HH:mm format';
        }

        if (!taskToValidate.duration) {
            errors.duration = 'Duration is required';
        } else if (isNaN(taskToValidate.duration) || parseInt(taskToValidate.duration, 10) <= 0) {
            errors.duration = 'Duration must be a positive number';
        }

        if (taskToValidate.description && taskToValidate.description.length > 200) {
            errors.description = 'Description must be less than 200 characters';
        }
        return Object.keys(errors).length === 0;
    };

    // Utility function to check valid time format HH:mm
    const isValidTime = (time) => {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    };

    // Define or calculate endTime if necessary
    // For example, if duration is in minutes and startTime is in 'HH:mm' format:
    // const endTime = calculateEndTime(task.startTime, task.duration);

    // Conditionally render edit view or display view
    return (
        <div className="card mb-3">
            <div className="card-body">
                {isEditing ? (
                    // Render inputs for editing
                    <>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editedTask.title}
                            onChange={handleEditChange}
                            name="title"
                        />
                        <textarea
                            className="form-control mb-2"
                            value={editedTask.description}
                            onChange={handleEditChange}
                            name="description"
                        />
                        <input
                            type="time"
                            className="form-control mb-2"
                            value={editedTask.startTime}
                            onChange={handleEditChange}
                            name="startTime"
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={editedTask.duration}
                            onChange={handleEditChange}
                            name="duration"
                        />
                        <Button text="Save" onClick={saveEdit} /> {/* Make sure this button calls saveEdit */}
                        <Button text="Cancel" onClick={cancelEdit} />
                    </>
                ) : (
                    <>
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        {/* Make sure to define or calculate endTime */}
                        <p className="card-text">
                            <small className="text-muted">
                                {task.startTime} - {/* endTime would go here */}
                            </small>
                        </p>
                        <div className="d-flex justify-content-between">
                            <Button text="Edit" onClick={() => onEdit(task)} className="btn btn-primary" />
                            <button className="btn btn-danger" onClick={onRemove}>Delete</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Task;
