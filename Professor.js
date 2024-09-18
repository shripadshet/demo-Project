import React, { useState } from "react";
import './Student.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
function Professor() {
  const [state, setState] = useState({
    userGroup: [],
    users: {
      name: "",
      email: "",
    },
    isEdit: null,
  });

  const handleChange = (e, name) => {
    const cloneState = { ...state };
    if (name === "name") {
      cloneState.users.name = e.target.value;
    }
    if (name === "email") {
      cloneState.users.email = e.target.value;
    }
    setState(cloneState);
  };

  const handleAdd = () => {
    const { name, email } = state.users;
    if (state.isEdit !== null) {
      const updatedList = state.userGroup?.map((obj, i) =>
        i === state.isEdit ? { name, email } : obj
      );
      setState({
        userGroup: updatedList,
        users: {
          name: "",
          email: "",
        },
        isEdit: null,
      });
    } else {
      setState((prevState) => ({
        userGroup: [...prevState.userGroup, prevState.users],
        users: {
          name: "",
          email: "",
        },
        isEdit: null,
      }));
    }
  };

  const handleEdit = (i) => {
    setState((prevState) => ({
      users: { ...prevState.userGroup[i] },
      userGroup: [...prevState.userGroup],
      isEdit: i,
    }));
  };

  const handleDelete = (item) => {
    const filterList = state.userGroup.filter((fil) => fil.name !== item.name);
    setState({
      userGroup: filterList,
      users: { ...state.users },
      isEdit: null,
    });
  };

  return (
    <>
    <h1 style={{textAlign:"center"}}>Add a Professor </h1>
    <div className="student-container">
      <form className="student-form">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={state.users.name}
            placeholder="Name"
            onChange={(e) => handleChange(e, "name")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={state.users.email}
            placeholder="Email"
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
        <button
          className="student-button"
          type="button"
          onClick={handleAdd}
        >
          {state.isEdit !== null ? "Update" : "Add"}
        </button>
      </form>
 <div className="table-responsive">
    {state.userGroup?.length > 0 ? 
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th> {/* Added column for actions */}
          </tr>
        </thead>
        <tbody>
          {state.userGroup?.map((obj, i) => (
            <tr key={i}>
              <td>{i + 1}</td> {/* Serial number */}
              <td>{obj.name}</td>
              <td>{obj.email}</td>
              <td>
                <button
                  className="student-button btn btn-warning"
                  type="button"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </button>
                <button
                  className="student-button btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(obj)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : null }
    </div>
      
    </div>
    </>
  );
}

export default Professor;
