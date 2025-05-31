import React, { useState } from 'react';
import './TaskAssignment.css';
import { FaPlusCircle, FaCheckCircle, FaTrash } from 'react-icons/fa';

// Sample Users and Tasks Data
const sampleUsers = [
  { id: 1, name: 'John Doe', role: 'User' },
  { id: 2, name: 'Jane Smith', role: 'User' },
  { id: 3, name: 'Admin User', role: 'Admin' },
];

const TaskAssignment = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState(sampleUsers);
  const [newTask, setNewTask] = useState('');
  const [assignedUser, setAssignedUser] = useState(null);
  const [taskStatus, setTaskStatus] = useState('Pending');

  const handleTaskAdd = () => {
    if (newTask && assignedUser) {
      const newTaskData = {
        id: tasks.length + 1,
        task: newTask,
        assignedTo: assignedUser,
        status: taskStatus,
      };
      setTasks([...tasks, newTaskData]);
      setNewTask('');
      setAssignedUser(null);
      setTaskStatus('Pending');
    } else {
      alert("Please enter a task and assign a user!");
    }
  };

  const handleTaskStatusChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' } : task
      )
    );
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="task-assignment">
      <h1 className="page-title">Task Assignment</h1>

      {/* Add New Task Section */}
      <div className="add-task">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          value={assignedUser ? assignedUser.id : ''}
          onChange={(e) => setAssignedUser(users.find(user => user.id === parseInt(e.target.value)))}
        >
          <option value="">Assign User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button className="add-task-btn" onClick={handleTaskAdd}><FaPlusCircle /> Add Task</button>
      </div>

      {/* Existing Tasks List */}
      <div className="tasks-list">
        <h2>Assigned Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.task}</span>
              <span>Assigned to: {task.assignedTo.name}</span>
              <span>Status: {task.status}</span>
              <button onClick={() => handleTaskStatusChange(task.id)}>
                {task.status === 'Pending' ? <FaCheckCircle /> : <FaTrash />}
              </button>
              <button onClick={() => handleTaskDelete(task.id)}><FaTrash /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskAssignment;
