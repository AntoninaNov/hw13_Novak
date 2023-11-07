import React, { useState } from 'react';
import Button from './Button';

// Utility function to check valid time format HH:mm
const isValidTime = (time) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
};


const NewTaskForm = ({ onTaskSubmit }) => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        } else if (title.trim().length < 3 || title.trim().length > 50) {
            newErrors.title = 'Title must be between 3 and 50 characters';
        }

        if (!startTime) {
            newErrors.startTime = 'Start time is required';
        } else if (!isValidTime(startTime)) {
            newErrors.startTime = 'Start time must be in HH:mm format';
        }

        if (!duration) {
            newErrors.duration = 'Duration is required';
        } else if (isNaN(duration) || parseInt(duration, 10) <= 0) {
            newErrors.duration = 'Duration must be a positive number';
        }

        if (description && description.length > 200) {
            newErrors.description = 'Description must be less than 200 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handleSubmit now prevents submission if the form is invalid
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return; // Stop the function if the form is invalid

        // Submitting task after validation
        onTaskSubmit({ title, description, startTime, duration: parseInt(duration, 10) });
        // Reset form fields
        setTitle('');
        setStartTime('');
        setDuration('');
        setDescription('');
        setErrors({});
    };

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="taskTitle">Task Title</label>
                <input type="text" className="form-control" id="taskTitle" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="taskStartTime">Start Time</label>
                <input type="time" className="form-control" id="taskStartTime" value={startTime} onChange={e => setStartTime(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="taskDuration">Expected Duration (hours)</label>
                <input type="number" className="form-control" id="taskDuration" value={duration} onChange={e => setDuration(e.target.value)} required min="0" />
            </div>

            <div className="form-group">
                <label htmlFor="taskDescription">Task Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="taskDescription"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
    );
};

export default NewTaskForm;
