import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGroups, createNewUser } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalAddEdit = (props) => {
  const { action, dataModal } = props;
  const defaultUserData = {
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    groupId: "",
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [groups, setGroups] = useState([]);

  const defaultValidInput = {
    email: true,
    phoneNumber: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    groupId: true,
  };
  const [validInput, setValidInput] = useState(defaultValidInput);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    let res = await fetchAllGroups();
    if (res && res.data && +res.data.EC === 0) {
      let groupsData = res.data.DT;
      setGroups(groupsData);
      if (res.data.DT && res.data.DT.length > 0) {
        // set is a async func --> use: groupsData instead of groups in state
        setUserData({ ...userData, groupId: groupsData[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModal,
        groupId: dataModal.groupId ?? "",
      });
    }
  }, [dataModal]);

  const handleOnChangeInput = (value, key) => {
    let _userData = _.cloneDeep(userData);
    _userData[key] = value;
    setUserData(_userData);
  };

  const checkValidInput = () => {
    setValidInput(defaultValidInput);
    let arr = ["email", "phoneNumber", "password", "groupId"];
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        // Copy flat object --> exact, nested object --> no exact
        // setValidInput({ ...validInput, [arr[i]]: false });
        // toast.error(`Empty input ${arr[i]}`);
        // return false;

        // Copy flat and nested object
        let _validInput = _.cloneDeep(defaultValidInput);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        if (arr[i] === "groupId") {
          toast.error("Empty input group");
        } else if (arr[i] === "phoneNumber") {
          toast.error("Empty input phone number");
        } else {
          toast.error(`Empty input ${arr[i]}`);
        }
        return false;
      }
    }
    return true;
  };

  const handleSaveUser = async () => {
    try {
      if (checkValidInput() === true) {
        let res = await createNewUser(userData);
        if (res && res.data && +res.data.EC === 0) {
          toast.success(res.data.EM);
          props.onHide();
          setUserData({ ...defaultUserData, groupId: groups?.[0]?.id ?? "" });
        } else if (res && res.data && +res.data.EC !== 0) {
          toast.error(res.data.EM);
          // let _validInput = _.cloneDeep(defaultValidInput);
          // _validInput[res.data.DT] = false;
          // setValidInput(_validInput);
          setValidInput({ ...defaultValidInput, [res.data.DT]: false });
        }
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  const handleClose = () => {
    props.onHide();
    if (action === "CREATE") {
      setUserData({ ...defaultUserData, groupId: groups?.[0]?.id ?? "" });
      setValidInput(defaultValidInput);
    }
    // setUserData({ ...defaultUserData, groupId: groups[0].id });
    // setValidInput(defaultValidInput);
  };

  return (
    <Modal
      {...props}
      size="lg"
      className="modal-add-edit"
      onHide={() => handleClose()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>
            {props.action === "CREATE" ? "Create a new user" : "Edit a user"}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-body row">
          <div className={"col-12 col-sm-6 mb-3"}>
            <label>
              Email address (<span className="red">*</span>) :
            </label>
            <input
              className={
                validInput.email ? "form-control" : "form-control is-invalid"
              }
              type="email"
              disabled={action === "CREATE" ? false : true}
              value={userData.email}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "email")
              }
            />
          </div>

          <div className="col-12 col-sm-6 mb-3">
            <label>
              Phone number (<span className="red">*</span>) :
            </label>
            <input
              className={
                validInput.phoneNumber
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="text"
              disabled={action === "CREATE" ? false : true}
              value={userData.phoneNumber}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "phoneNumber")
              }
            />
          </div>

          <div className="col-12 col-sm-6 mb-3">
            <label>Username:</label>
            <input
              className="form-control"
              type="text"
              value={userData.username}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "username")
              }
            />
          </div>

          <div className="col-12 col-sm-6 mb-3">
            {action === "CREATE" && (
              <>
                <label>
                  Password (<span className="red">*</span>) :
                </label>
                <input
                  className={
                    validInput.password
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="password"
                  value={userData.password}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "password")
                  }
                />
              </>
            )}
          </div>

          <div className="col-12 mb-3">
            <label>Address:</label>
            <input
              className="form-control"
              type="text"
              value={userData.address}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "address")
              }
            />
          </div>

          <div className="col-12 col-sm-6 mb-3">
            <label>Gender:</label>
            <select
              value={userData.sex}
              className="form-select"
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "sex")
              }
            >
              <option value="">-- Select gender --</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 mb-3">
            <label>
              Group (<span className="red">*</span>) :
            </label>
            <select
              value={userData.groupId}
              className="form-select"
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "groupId")
              }
            >
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSaveUser()}>
          {action === "CREATE" ? "Save" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEdit;
