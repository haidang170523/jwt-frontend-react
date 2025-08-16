import "./Roles.scss";
import { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const Roles = () => {
  const [roles, setRoles] = useState({
    role1: { url: "", description: "" },
  });

  // useEffect(() => {
  //   Object.entries(roles).map(([key, value]) => {
  //     console.log(key, value);
  //   });
  // }, []);

  const handleOnChange = (key, name, value) => {
    let _roles = _.cloneDeep(roles);
    _roles[key][name] = value;
    setRoles(_roles);
  };

  const handleAddRole = () => {
    let _roles = _.cloneDeep(roles);
    _roles[uuidv4()] = { url: "", description: "" };
    setRoles(_roles);
  };

  const handleDeleteRole = (key) => {
    let _roles = _.cloneDeep(roles);
    delete _roles[key];
    setRoles(_roles);
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3">
          <div className="title-role">
            <h4>Add a new role</h4>
          </div>

          <div className="role-parent">
            {Object.entries(roles).map(([key, value], index) => {
              return (
                <div className="row role-child mt-3" key={key}>
                  <div className="col-10 col-md-5">
                    <label>URL: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={value.url}
                      onChange={(event) =>
                        handleOnChange(key, "url", event.target.value)
                      }
                    />
                  </div>

                  <div className="col-10 col-md-5">
                    <label>Description: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={value.description}
                      onChange={(event) =>
                        handleOnChange(key, "description", event.target.value)
                      }
                    />
                  </div>

                  <div className="col-2 mt-md-4 actions">
                    {index >= 1 && (
                      <i
                        className="fa fa-trash delete"
                        onClick={() => {
                          handleDeleteRole(key);
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <button
              className="btn btn-warning mt-3 me-3"
              onClick={handleAddRole}
            >
              Add
            </button>
            <button className="btn btn-primary mt-3">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
