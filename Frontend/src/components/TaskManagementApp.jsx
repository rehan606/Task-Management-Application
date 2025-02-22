import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const TaskManagementApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ Title: '', Description: '', Category: 'To-Do' });
    const [isLoading, setIsLoading] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // Track the task being edited

    // Fetch tasks from the backend on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
            const data = Array.isArray(response.data) ? response.data : [];
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error fetching tasks!',
                showConfirmButton: false,
                timer: 3000
            });
        }
    };

    const handleAddTask = async e => {
        e.preventDefault();
        setIsLoading(true);

        if (!newTask.Title.trim()) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Title is required!',
                showConfirmButton: false,
                timer: 3000
            });
            setIsLoading(false);
            return;
        }

        try {
            const taskData = {
                ...newTask,
                TimeStamp: new Date().toISOString()
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData);

            if (response.data.insertedId) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${newTask.Title} is successfully added`,
                    showConfirmButton: false,
                    timer: 3000
                });
                setTasks([...tasks, { ...taskData, _id: response.data.insertedId }]);
                setNewTask({ Title: '', Description: '', Category: 'To-Do' });
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error.response?.data?.message || error.message || 'Something went wrong',
                showConfirmButton: false,
                timer: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, updatedTask);
            const updatedTasks = tasks.map(task => (task._id === id ? { ...task, ...updatedTask } : task));
            setTasks(updatedTasks);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Task updated successfully!',
                showConfirmButton: false,
                timer: 3000
            });
            setEditingTask(null); // Close the edit form
        } catch (error) {
            console.error('Error updating task:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error updating task!',
                showConfirmButton: false,
                timer: 3000
            });
        }
    };

    const handleDeleteTask = async id => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
                const updatedTasks = tasks.filter(task => task._id !== id);
                setTasks(updatedTasks);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Task deleted successfully!',
                    showConfirmButton: false,
                    timer: 3000
                });
            } catch (error) {
                console.error('Error deleting task:', error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error deleting task!',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDrop = async (e, targetCategory) => {
        const taskId = e.dataTransfer.getData('taskId');
        const task = tasks.find(t => t._id === taskId);
        if (task.Category !== targetCategory) {
            await handleUpdateTask(taskId, { Category: targetCategory });
        }
    };

    const handleReorder = async (taskId, newIndex, category) => {
        const categoryTasks = tasks.filter(t => t.Category === category);
        const task = categoryTasks.find(t => t._id === taskId);

        if (!task) return;

        categoryTasks.splice(categoryTasks.indexOf(task), 1);
        categoryTasks.splice(newIndex, 0, task);

        const reorderedTasks = categoryTasks.map((t, index) => ({
            ...t,
            order: index
        }));

        try {
            await Promise.all(reorderedTasks.map(t => axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${t._id}`, { order: t.order })));
            setTasks(prevTasks => prevTasks.map(t => (t.Category === category ? reorderedTasks.find(rt => rt._id === t._id) || t : t)));
        } catch (error) {
            console.error('Error reordering tasks:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-800 dark:text-white">
            <h1 className="text-4xl font-semibold text-center mb-10">Task Management</h1>
            <div className="max-w-4xl mx-auto">
                {/* Add Task Form */}
                <form onSubmit={handleAddTask} className="bg-white p-4 rounded-lg shadow mb-8 dark:bg-neutral dark:text-white ">
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.Title}
                        onChange={e => setNewTask({ ...newTask, Title: e.target.value })}
                        className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        maxLength={50}
                        required
                    />
                    <textarea
                        placeholder="Task Description"
                        value={newTask.Description}
                        onChange={e => setNewTask({ ...newTask, Description: e.target.value })}
                        className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        maxLength={200}
                    />
                    <select
                        value={newTask.Category}
                        onChange={e => setNewTask({ ...newTask, Category: e.target.value })}
                        className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        required>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white transition">
                        {isLoading ? 'Adding...' : 'Add Task'}
                    </button>
                </form>

                {/* Task Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['To-Do', 'In Progress', 'Done'].map(category => (
                        <div key={category} onDrop={e => handleDrop(e, category)} onDragOver={e => e.preventDefault()} className="bg-white p-4 rounded-lg shadow dark:bg-neutral dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{category}</h2>
                            {Array.isArray(tasks) &&
                                tasks
                                    .filter(task => task.Category === category)
                                    .sort((a, b) => a.order - b.order)
                                    .map((task, index) => (
                                        <div
                                            key={task._id}
                                            draggable
                                            onDragStart={e => handleDragStart(e, task._id)}
                                            className="p-4 mb-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700">
                                            {editingTask === task._id ? (
                                                // Edit Form
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        handleUpdateTask(task._id, {
                                                            Title: e.target.title.value,
                                                            Description: e.target.description.value,
                                                            Category: e.target.category.value
                                                        });
                                                    }}>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        defaultValue={task.Title}
                                                        className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                                        required
                                                    />
                                                    <textarea
                                                        name="description"
                                                        defaultValue={task.Description}
                                                        className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                                    />
                                                    <select
                                                        name="category"
                                                        defaultValue={task.Category}
                                                        className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                                        required>
                                                        <option value="To-Do">To-Do</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Done">Done</option>
                                                    </select>
                                                    <div className="flex space-x-2">
                                                        <button type="submit" className="text-sm bg-green-500 text-white p-1 rounded hover:bg-green-600">
                                                            Save
                                                        </button>
                                                        <button type="button" onClick={() => setEditingTask(null)} className="text-sm bg-gray-500 text-white p-1 rounded hover:bg-gray-600">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                // Task Details
                                                <>
                                                    <h3 className="font-bold">{task.Title}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{task.Description}</p>
                                                    <p className="text-xs text-gray-400">{new Date(task.TimeStamp).toLocaleString()}</p>
                                                    <div className="mt-2 flex space-x-2">
                                                        <button onClick={() => setEditingTask(task._id)} className="text-sm text-blue-500 hover:text-blue-700">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDeleteTask(task._id)} className="text-sm text-red-500 hover:text-red-700">
                                                            Delete
                                                        </button>
                                                        <button className="ml-3" onClick={() => handleReorder(task._id, index - 1, category)} disabled={index === 0}>
                                                            ⬆️
                                                        </button>
                                                        <button
                                                            className="ml-3"
                                                            onClick={() => handleReorder(task._id, index + 1, category)}
                                                            disabled={index === tasks.filter(t => t.Category === category).length - 1}>
                                                            ⬇️
                                                        </button>
                                                    </div>
                                                </>
                                            )}
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
