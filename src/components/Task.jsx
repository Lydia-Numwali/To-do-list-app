import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import Update from './Update';

const Task = () => {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask) {
      const num = toDo.length + 1;
      const newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  };

  const markDone = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTasks);
  };

  const handleClearCompletedTask = () => {
    const newTodo = toDo.filter((task) => !task.status);
    setToDo(newTodo);
  };

  const deleteTask = (id) => {
    const newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
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
    <div className="container App"><br /><br />
      <h2>Task Tracker</h2><br /><br />
      {updateData && updateData ? (
        <Update updateData={updateData} setUpdateData={setUpdateData} />
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
        <React.Fragment key={task.id}>
        <div className="col taskBg">
        <div className={task.status ? 'completed' : ''}>
              <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
              <span
              onClick={() => markDone(task.id)}
              title="Completed / Not Completed"
              >
              <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              {!task.status ? (
                <span title="Edit"onClick={() =>setUpdateData({id: task.id,title: task.title,status: task.status ? true : false})}>
                <FontAwesomeIcon icon={faPen} />
                </span>
                ) : null}
                <span onClick={() => deleteTask(task.id)} title="Delete">
                <FontAwesomeIcon icon={faTrashCan} />
                </span>
                </div>
                </div>
                </React.Fragment>
))}
{
  filteredTasks.length === 0 ? 'No tasks...' :
<div className="filter-buttons">
<button onClick={() => filterTasks('completed')} className='btn btn-xs btn-primary'>Show Completed Tasks</button>
<button onClick={() => filterTasks('incomplete')} className='btn btn-xs btn-primary'>Show Incomplete Tasks</button>
<button onClick={() => filterTasks('all')} className='btn btn-xs btn-primary'>Show All Tasks</button>
<button onClick={handleClearCompletedTask} className='btn btn-xs btn-primary'>Clear Completed Tasks</button>
</div>
}
</div>
);
};

export default Task;