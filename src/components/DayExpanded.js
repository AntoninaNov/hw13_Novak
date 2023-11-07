import React from "react";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import Button from "./Button";


const DayExpandedView = ({ selectedDay, onTaskAdded, onTaskEdited, onTaskRemoved, dayTasks = [] }) => {

    // Add a new task to the selected day
    const handleTaskCreation = (taskData) => {
        onTaskAdded(selectedDay, taskData);
    };

    // Remove an existing task from the selected day
    const handleTaskDeletion = (taskId) => {
        onTaskRemoved(selectedDay, taskId);
    };

    return (
        <div className="day-expanded">
            <h5 className="day-expanded-title">Day: {selectedDay}</h5>
            <NewTaskForm onTaskSubmit={handleTaskCreation} />
            <div className="task-list">
                {dayTasks.length > 0 ? (
                    dayTasks.map((task) => (
                        <Task
                            key={task.id} // Ensure key is unique for each task
                            task={task}
                            dayId={selectedDay} // Pass selectedDay as dayId
                            onEdit={onTaskEdited}
                            onRemove={() => handleTaskDeletion(task.id)} // Remove function needs taskId
                        />
                    ))
                ) : (
                    <p className="text-muted">No new tasks have been added yet.</p>
                )}
            </div>
        </div>
    );
};

export default DayExpandedView;
