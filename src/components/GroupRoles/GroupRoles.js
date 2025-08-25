import { fetchAllGroups } from "../../services/userService";
import { fetchAllRoles, fetchRolesByGroup } from "../../services/roleService";
import "./GroupRoles.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const GroupRoles = () => {
  const [groups, setGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [assignedRoles, setAssignedRoles] = useState([]);

  useEffect(() => {
    getAllGroups();
    getAllRoles();
  }, []);

  const getAllGroups = async () => {
    let res = await fetchAllGroups();
    if (res && +res.EC === 0) {
      let groupsData = res.DT;
      setGroups(groupsData);
    } else {
      toast.error(res.EM);
    }
  };

  const getAllRoles = async () => {
    let res = await fetchAllRoles();
    if (res && +res.EC === 0) {
      setListRoles(res.DT);
    } else if (res && +res.EC !== 0) {
      toast.error(res.EM);
    } else {
      toast.error("An error happened when fetching roles!");
    }
  };

  const getRolesByGroup = async (groupId) => {
    let res = await fetchRolesByGroup(groupId);
    if (res && +res.EC === 0) {
      setSelectedGroup(res.DT);
      let dataToUpdate = listRoles.map((item) => ({
        ...item,
        isAssigned: res.DT.Roles?.some((role) => role.id === item.id) || false,
      }));
      setAssignedRoles(dataToUpdate);
    } else if (res && +res.EC !== 0) {
      toast.error(res.EM);
    } else {
      toast.error("An error happened when fetching roles!");
    }
  };

  const handleOnChangeGroup = (groupId) => {
    if (!groupId) {
      setSelectedGroup({});
      return;
    }
    getRolesByGroup(groupId);
  };

  const handleOnChangeRole = (roleId) => {
    let _assignedRoles = _.cloneDeep(assignedRoles);
    let foundIndex = _assignedRoles.findIndex((item) => item.id === +roleId);
    // console.log(">>> Check index: ", foundIndex);
    _assignedRoles[foundIndex].isAssigned =
      !_assignedRoles[foundIndex].isAssigned;
    // console.log(">>> Check assignedRoles: ", _assignedRoles);
    setAssignedRoles(_assignedRoles);
  };

  return (
    <div className="group-roles-container">
      <div className="container">
        <div className="group-roles-header mt-3">
          <h4>Group Roles:</h4>
        </div>

        <div className="group-roles-body">
          <div className="assign-group-roles">
            <div className="col-12 col-sm-6 mb-3">
              <label>
                Select Group (<span className="red">*</span>) :
              </label>
              <select
                className="form-select"
                onChange={(event) => handleOnChangeGroup(event.target.value)}
              >
                <option value="">-- Please choose your group --</option>
                {groups.length > 0 &&
                  groups.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <hr />
          {selectedGroup.Roles && (
            <>
              <div className="list-roles">
                <h5>Assign Roles: </h5>
                {assignedRoles &&
                  assignedRoles.length > 0 &&
                  assignedRoles.map((item) => {
                    return (
                      <div className="form-check" key={item.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={item.id}
                          checked={item.isAssigned}
                          onChange={(event) => {
                            handleOnChangeRole(event.target.value);
                          }}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                          {item.url} - {item.description}
                        </label>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-3">
                <button className="btn btn-primary">Save</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupRoles;
