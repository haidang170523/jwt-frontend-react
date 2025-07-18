import { fetchAllUsers } from "../../services/userService";
import "./Users.scss";
import { useEffect, useState } from "react";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let response = await fetchAllUsers();
    if (response && response.data && +response.data.EC === 0) {
      setListUsers(response.data.DT);
      console.log("Check list users: ", response.data.DT);
    }
  };
  return (
    <div className="container">
      <div className="manage-users-container">
        <div className="users-header">
          <div className="title">
            <h3>Table Users</h3>
          </div>
          <div className="actions">
            <button className="btn btn-success">Refresh</button>
            <button className="btn btn-primary">Add User</button>
          </div>
        </div>
        <div className="users-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Group</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                <>
                  {listUsers.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group?.name ?? ""}</td>
                        {/* item.Group not null/undefined, return item.Group.name
                      or return item.Group is undefined and if it.Group?.name
                      is undefined, ?? help return empty string */}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <span>Not Found Users</span>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="users-footer">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Users;
