import React from 'react';
import Day from './Day';

const Week = ({ days, onDayClick, activeDayId }) => {
    return (
        <div className="list-group">
            {days.map((day, index) => (
                <Day key={index} day={day} onDayClick={onDayClick} isActive={activeDayId === day.id} />
            ))}
        </div>
    );
};

export default Week;
