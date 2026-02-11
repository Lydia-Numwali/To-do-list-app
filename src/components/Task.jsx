import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import Update from './Update';

const Task = () => {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setToDo(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const addTask = async () => {
    if (newTask) {
      try {
        const response = await axios.post('http://localhost:5000/tasks', {
          title: newTask,
          status: false,
        });
        setToDo([...toDo, response.data]);
        setNewTask('');
      } catch (error) {
        console.error('Error adding task', error);
      }
    }
  };

  const markDone = async (id) => {
    try {
      const taskToUpdate = toDo.find((task) => task._id === id);
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, {
        ...taskToUpdate,
        status: !taskToUpdate.status,
      });

      const newTasks = toDo.map((task) => {
        if (task._id === id) {
          return response.data;
        }
        return task;
      });
      setToDo(newTasks);
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  const saveUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${updateData._id}`,
        updateData
      );
      const newTasks = toDo.map((task) => {
        if (task._id === updateData._id) {
          return response.data;
        }
        return task;
      });
      setToDo(newTasks);
      setUpdateData('');
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleClearCompletedTask = async () => {
    // This would ideally require a backend endpoint to delete multiple or loop.
    // For now, I will loop through completed tasks and delete them one by one.
    // Or I can filter locally but that won't persist delete.
    // Better to implement individual delete for simplicity or add functionality.
    // I'll stick to local filter for now? No, user wants backend storage.
    // I'll implement loop for now.
    const completedTasks = toDo.filter((task) => task.status);
    for (const task of completedTasks) {
      await deleteTask(task._id);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      const newTasks = toDo.filter((task) => task._id !== id);
      setToDo(newTasks);
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const filterTasks = (status) => {
    setFilter(status);
  };

  const filteredTasks = toDo.filter((task) => {
    if (filter === 'completed') {
      return task.status;
    } else if (filter === 'incomplete') {
      return !task.status;
    } else {
      return true;
    }
  });

  return (
    <div className="container App">
      <br />
      <br />
      <h2>Task Tracker</h2>
      <br />
      <br />
      {updateData && updateData ? (
        <Update
          updateData={updateData}
          setUpdateData={setUpdateData}
          saveUpdate={saveUpdate}
        />
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-primary" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}

      {filteredTasks.map((task, index) => (
        <React.Fragment key={task._id}>
          <div className="col taskBg">
            <div className={task.status ? 'completed' : ''}>
              <span className="taskText">{task.title}</span>
            </div>
            <div className="iconsWrap">
              <span
                onClick={() => markDone(task._id)}
                title="Completed / Not Completed"
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              {!task.status ? (
                <span
                  title="Edit"
                  onClick={() =>
                    setUpdateData({
                      _id: task._id,
                      id: task._id, // Keep id for compatibility if needed, but refer to _id
                      title: task.title,
                      status: task.status,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                </span>
              ) : null}
              <span onClick={() => deleteTask(task._id)} title="Delete">
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          </div>
        </React.Fragment>
      ))}
      {filteredTasks.length === 0 ? (
        'No tasks...'
      ) : (
        <div className="filter-buttons">
          <button
            onClick={() => filterTasks('completed')}
            className="btn btn-xs btn-primary"
          >
            Show Completed Tasks
          </button>
          <button
            onClick={() => filterTasks('incomplete')}
            className="btn btn-xs btn-primary"
          >
            Show Incomplete Tasks
          </button>
          <button
            onClick={() => filterTasks('all')}
            className="btn btn-xs btn-primary"
          >
            Show All Tasks
          </button>
          <button
            onClick={handleClearCompletedTask}
            className="btn btn-xs btn-primary"
          >
            Clear Completed Tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;