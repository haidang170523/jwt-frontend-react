import "./Roles.scss";
import { useState, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRoles from "./TableRoles";

const Roles = () => {
  const defaultRoles = { url: "", description: "", isValid: true };
  const [roles, setRoles] = useState({ role1: defaultRoles });
  const childRef = useRef();

  const checkUrl = (url) => {
    if (!url || url.includes(" ")) {
      return false;
    }
    return true;
  };

  const handleOnChange = (key, name, value) => {
    let _roles = _.cloneDeep(roles);
    _roles[key][name] = value;
    if (name === "url" && checkUrl(value)) {
      _roles[key]["isValid"] = true;
    }
    setRoles(_roles);
  };

  const handleAddRole = () => {
    let _roles = _.cloneDeep(roles);
    _roles[uuidv4()] = defaultRoles;
    setRoles(_roles);
  };

  const handleDeleteRole = (key) => {
    let _roles = _.cloneDeep(roles);
    delete _roles[key];
    setRoles(_roles);
  };

  const buildDataToPersist = () => {
    let _roles = _.cloneDeep(roles);
    let dataToPersist = Object.entries(_roles).reduce((acc, [key, value]) => {
      if (value && checkUrl(value.url)) {
        acc.push({ url: value.url, description: value.description });
      }
      return acc;
    }, []);
    return dataToPersist;
  };

  const handleSaveRoles = async () => {
    try {
      let invalidObj = Object.entries(roles).find(
        ([key, value]) => value && !checkUrl(value.url)
      );

      if (invalidObj) {
        let _roles = _.cloneDeep(roles);
        _roles[invalidObj[0]]["isValid"] = false;
        setRoles(_roles);
        toast.error("Please enter a valid URL for all the role.");
      } else {
        let dataToPersist = buildDataToPersist();
        let res = await createRoles(dataToPersist);
        if (res && +res.EC === 0) {
          setRoles({ role1: defaultRoles });
          toast.success(res.EM);
          childRef.current.refToGetAllRoles();
        } else if (res && +res.EC !== 0) {
          toast.error(res.EM);
        }
      }
    } catch (error) {
      toast.error("An error occurred while saving roles.");
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="modify-role mt-3">
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
                      className={
                        value.isValid
                          ? "form-control"
                          : "form-control is-invalid"
                      }
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
            <button
              className="btn btn-primary mt-3"
              onClick={() => handleSaveRoles()}
            >
              Save
            </button>
          </div>
        </div>
        <hr />
        <div className="mt-3 table-role">
          <h4>List Current Roles: </h4>
          <TableRoles ref={childRef} />
        </div>
      </div>
    </div>
  );
};

export default Roles;
