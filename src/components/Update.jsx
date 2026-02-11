import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Update = ({ updateData, setUpdateData, saveUpdate }) => {
  // cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  };

  // Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      _id: updateData._id, 
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <input
            value={updateData && updateData.title}
            onChange={(e) => changeTask(e)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-lg btn-primary" onClick={saveUpdate}>
            Update
          </button>
          <button className="btn btn-lg btn-primary" onClick={cancelUpdate}>
            Cancel
          </button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Update;
