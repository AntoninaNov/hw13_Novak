import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import Week from './components/Week';
import DayExpanded from './components/DayExpanded';

//to run: npx react-scripts start


const sampleData = {
    week: [
        {
            id: 'monday',
            name: 'Monday',
            date: new Date(2024, 0, 1),
            tasks: [
                { id: 1, title: 'Grocery shopping', description: 'Buy groceries for the week', startTime: '10:00', duration: 2 },
                { id: 2, title: 'Team Meeting', description: 'Weekly sync with the team', startTime: '14:00', duration: 1 },
            ],
        },
        {
            id: 'tuesday',
            name: 'Tuesday',
            date: new Date(2024, 0, 2),
            tasks: [
                { id: 3, title: 'Workout', description: 'Gym session', startTime: '07:00', duration: 1 },
                { id: 4, title: 'Doctor Appointment', description: 'Routine check-up', startTime: '12:00', duration: 1 },
            ],
        },
        {
            id: 'wednesday',
            name: 'Wednesday',
            date: new Date(2024, 0, 3),
            tasks: [
                { id: 5, title: 'Car Service', description: 'Take the car for servicing', startTime: '09:00', duration: 3 },
                { id: 6, title: 'Coding Practice', description: 'Solve new algorithms', startTime: '15:00', duration: 2 },
            ],
        },
        {
            id: 'thursday',
            name: 'Thursday',
            date: new Date(2024, 0, 4),
            tasks: [
                { id: 7, title: 'Networking Event', description: 'Attend local business networking event', startTime: '11:00', duration: 2 },
                { id: 8, title: 'Read Book', description: 'Read new marketing book', startTime: '19:00', duration: 1 },
            ],
        },
        {
            id: 'friday',
            name: 'Friday',
            date: new Date(2024, 0, 5),
            tasks: [
                { id: 9, title: 'Project Deadline', description: 'Complete and submit project', startTime: '13:00', duration: 3 },
                { id: 10, title: 'Date Night', description: 'Dinner at Italian restaurant', startTime: '20:00', duration: 2 },
            ],
        },
        {
            id: 'saturday',
            name: 'Saturday',
            date: new Date(2024, 0, 6),
            tasks: [
                { id: 11, title: 'Yoga Class', description: 'Attend morning yoga session', startTime: '08:00', duration: 1 },
                { id: 12, title: 'BBQ Party', description: 'Host a BBQ party for friends', startTime: '17:00', duration: 4 },
            ],
        },
        {
            id: 'sunday',
            name: 'Sunday',
            date: new Date(2024, 0, 7),
            tasks: [
                { id: 13, title: 'Laundry', description: 'Do the weekly laundry', startTime: '09:00', duration: 2 },
                { id: 14, title: 'Meal Prep', description: 'Prepare meals for the upcoming week', startTime: '14:00', duration: 3 },
            ],
        },
    ],
};

function App() {
    const [days, setDays] = useState(sampleData.week);
    const [activeDay, setActiveDay] = useState(null);


    // When a day is clicked, set it as active
    const handleDayClick = (dayId) => {
        const currentDay = days.find(day => day.id === dayId);
        setActiveDay(currentDay);
    };

    // It now validates the new task before adding it
    const addTaskToDay = (dayId, newTask) => {
        // Validation logic could be extracted if it grows too complex
        if (!newTask.title || newTask.duration <= 0) {
            alert('Invalid task data.');
            return; // Stop the function if the task is invalid
        }

        setDays(days.map(day => {
            if (day.id === dayId) {
                // Ensuring task has a unique ID and default description if none is provided
                const taskWithDefaults = {
                    ...newTask,
                    id: Date.now(),
                    description: newTask.description || 'No description provided',
                };
                return { ...day, tasks: [...day.tasks, taskWithDefaults] };
            }
            return day;
        }));
    };


    // Function to remove a task from the active day
    const removeTaskFromDay = (dayId, taskId) => {
        setDays(days.map(day => {
            if (day.id === dayId) {
                // Filter out the task to be removed
                return { ...day, tasks: day.tasks.filter(task => task.id !== taskId) };
            }
            return day;
        }));
    };

    // Function to edit a task in the active day
    const editTaskInDay = (dayId, taskId, updatedTask) => {
        setDays(days.map(day => {
            if (day.id === dayId) {
                // Map through the tasks and update the task that matches taskId
                return {
                    ...day,
                    tasks: day.tasks.map(task => task.id === taskId ? { ...task, ...updatedTask } : task)
                };
            }
            return day;
        }));
    };

    // Update activeDay whenever days changes
    useEffect(() => {
        if (activeDay) {
            // Find the new version of the active day based on the latest days state
            const updatedActiveDay = days.find(day => day.id === activeDay.id);
            setActiveDay(updatedActiveDay);
        }
    }, [days]);
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container fluid>
                    <Navbar.Brand href="#">Weekly Planner</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <Row>
                    {/* Week view on the left */}
                    <Col md={4} className="scrollable-column">
                        <Week days={days} onDayClick={handleDayClick} activeDayId={activeDay?.id} />
                    </Col>

                    {/* Details view on the right */}
                    <Col md={8}>
                        {activeDay && (
                            <Row>
                                <Col>
                                    <DayExpanded
                                        selectedDay={activeDay.id}
                                        onTaskAdded={addTaskToDay}
                                        onTaskEdited={editTaskInDay} // Pass the new edit function here
                                        onTaskRemoved={removeTaskFromDay}
                                        dayTasks={activeDay.tasks}
                                    />
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
