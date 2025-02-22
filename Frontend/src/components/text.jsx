import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TaskManagementApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ Title: '', Description: '', Category: 'To-Do' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
            const data = Array.isArray(response.data) ? response.data : [];
            setTasks(data.sort((a, b) => a.order - b.order));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleReorder = async (taskId, newIndex, category) => {
        const categoryTasks = tasks.filter(t => t.Category === category).sort((a, b) => a.order - b.order);
        const task = categoryTasks.find(t => t._id === taskId);

        if (!task) return;

        categoryTasks.splice(categoryTasks.indexOf(task), 1);
        categoryTasks.splice(newIndex, 0, task);

        const reorderedTasks = categoryTasks.map((t, index) => ({
            ...t,
            order: index
        }));

        setTasks(prevTasks =>
            prevTasks.map(t => {
                const updatedTask = reorderedTasks.find(rt => rt._id === t._id);
                return updatedTask ? updatedTask : t;
            })
        );

        await Promise.all(reorderedTasks.map(t => axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${t._id}`, { order: t.order })));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Task Management</h1>
            <div className="max-w-4xl mx-auto">
                {/* Task Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['To-Do', 'In Progress', 'Done'].map(category => (
                        <div key={category} className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">{category}</h2>
                            {tasks
                                .filter(task => task.Category === category)
                                .map((task, index) => (
                                    <div key={task._id} className="p-4 mb-4 border rounded-lg bg-gray-50">
                                        <h3 className="font-bold">{task.Title}</h3>
                                        <p className="text-sm text-gray-600">{task.Description}</p>
                                        <button onClick={() => handleReorder(task._id, index - 1, category)} disabled={index === 0}>
                                            ⬆
                                        </button>
                                        <button onClick={() => handleReorder(task._id, index + 1, category)} disabled={index === tasks.filter(t => t.Category === category).length - 1}>
                                            ⬇
                                        </button>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskManagementApp;
