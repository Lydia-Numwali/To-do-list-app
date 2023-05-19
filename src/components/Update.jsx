import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const Update = ({updateData,setUpdateData}) => {
  
    const [toDo, setToDo] = useState([]);
     // cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  }
  // Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }
  // update task 
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task=>task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  }
  return (
    <div>
    <div className="row">
      <div className="col">
        <input 
          value={updateData && updateData.title} 
          onChange={ (e) => changeTask(e) } 
          className="form-control form-control-lg" 
        />
      </div>
      <div className="col-auto">
        <button 
          className="btn btn-lg btn-primary" 
          onClick={updateTask}
        >Update</button>
        <button 
          className="btn btn-lg btn-primary" 
          onClick={cancelUpdate}
        >Cancel</button>
      </div>
    </div>
    <br />
 
    </div>
  )
}

export default Update
