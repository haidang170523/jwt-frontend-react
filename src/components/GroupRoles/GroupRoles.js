import { fetchAllGroups } from "../../services/userService";
import {
  fetchAllRoles,
  fetchRolesByGroup,
  assignRolesToGroup,
} from "../../services/roleService";
import "./GroupRoles.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const GroupRoles = () => {
  const [groups, setGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  // const [listRoles, setListRoles] = useState([]);

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
      setListRoles(dataToUpdate);
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
    let _listRoles = _.cloneDeep(listRoles);
    let foundIndex = _listRoles.findIndex((item) => item.id === +roleId);
    _listRoles[foundIndex].isAssigned = !_listRoles[foundIndex].isAssigned;
    setListRoles(_listRoles);
  };

  const buildDataToAssign = () => {
    let result = {};
    result.groupId = selectedGroup.id;
    const _listRoles = _.cloneDeep(listRoles);
    let assignedRoles = _listRoles.filter((item) => item.isAssigned === true);
    result.Roles = assignedRoles.map((item) => {
      return { groupId: selectedGroup.id, roleId: item.id };
    });
    // console.log(">>> Check result: ", result);
    return result;
  };

  const handleSave = async () => {
    let dataToAssign = buildDataToAssign();
    let res = await assignRolesToGroup(dataToAssign);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
    } else if (res && +res.EC !== 0) {
      toast.error(res.EM);
    } else {
      toast.error("An error happened when assigning roles!");
    }
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
                {listRoles &&
                  listRoles.length > 0 &&
                  listRoles.map((item) => {
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
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupRoles;
