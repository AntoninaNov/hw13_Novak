import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Day = ({ day, onDayClick, isActive }) => {
    const totalDuration = day.tasks.reduce((sum, task) => sum + task.duration, 0);
    const taskSummary = day.tasks.length
        ? `${day.tasks.length} tasks, ${totalDuration} hrs`
        : "No tasks planned for the day.";

    return (
        <ListGroup.Item
            action
            onClick={() => onDayClick(day.id)}
            className={isActive ? "active" : ""}
            style={{ cursor: 'pointer' }}
        >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{day.name}</h5>
                <small>{taskSummary}</small>
            </div>
        </ListGroup.Item>
    );
};

export default Day;
