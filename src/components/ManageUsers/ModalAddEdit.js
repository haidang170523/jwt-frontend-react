import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGroups } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalAddEdit = (props) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    let res = await fetchAllGroups();
    if (res && res.data && +res.data.EC === 0) {
      setGroups(res.data.DT);
    } else {
      toast.error(res.data.EC);
    }
  };
  return (
    <Modal {...props} size="lg" show={true} className="modal-add-edit">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>{props.title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-body row">
          <div className="col-12 col-sm-6 mb-3">
            <label>
              Email address (<span className="red">*</span>) :
            </label>
            <input className="form-control" type="email" required />
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label>
              Phone number (<span className="red">*</span>) :
            </label>
            <input className="form-control" type="text" />
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label>Username:</label>
            <input className="form-control" type="text" />
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label>
              Password (<span className="red">*</span>) :
            </label>
            <input className="form-control" type="password" />
          </div>
          <div className="col-12 mb-3">
            <label>Address:</label>
            <input className="form-control" type="text" />
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label>Gender:</label>
            <select className="form-select" defaultValue={"Female"}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label>
              Group (<span className="red">*</span>) :
            </label>
            <select className="form-select">
              <option value="">-- Select a group --</option>
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
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.confirmDeleteUser}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEdit;
