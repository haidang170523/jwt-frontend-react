import { fetchAllUsers, deleteUser } from "../../services/userService";
import "./Users.scss";
import { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalAddEdit from "./ModalAddEdit";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  // Modal delete a user
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({});

  // Modal create/update a user
  const [showModalAddEdit, setShowModalAddEdit] = useState(false);
  const [actionModalAddEdit, setActionModalAddEdit] = useState("CREATE");
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // const { user } = useContext(UserContext);
  // console.log(">>> Check user: ", user);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && +response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListUsers(response.DT.users);
    }
  };
  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleAddUser = () => {
    setActionModalAddEdit("CREATE");
    setTimeout(() => {
      setShowModalAddEdit(true);
    }, 0);
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  const handleEditUser = (user) => {
    setActionModalAddEdit("UPDATE");
    setDataModalAddEdit(user);
    setTimeout(() => {
      setShowModalAddEdit(true);
    }, 0);
  };
  const handleDeleteUser = (user) => {
    setDataModalDelete(user);
    setShowModalDelete(true);
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModalDelete.id);
    if (response && +response.EC === 0) {
      toast.success(response.EM);
      await fetchUsers();
      setShowModalDelete(false);
    } else {
      toast.error(response.EM);
    }
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
    setDataModalDelete({});
  };

  const handleCloseModalAddEdit = async () => {
    setShowModalAddEdit(false);
    setDataModalAddEdit({});
    await fetchUsers();
  };

  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="users-header">
            <div className="title mt-3">
              <h3>Manage Users</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success me-3 "
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh"></i>
                Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleAddUser()}
              >
                <i className="fa fa-plus-circle"></i>
                Add User
              </button>
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group?.name ?? ""}</td>
                          {/* item.Group not null/undefined, return item.Group.name
                      or return item.Group is undefined and if it.Group?.name
                      is undefined, ?? help return empty string */}
                          <td>
                            <span
                              title="Edit"
                              className="edit"
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              title="Delete"
                              className="delete"
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not Found Users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="users-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>

      {showModalDelete && (
        <ModalDelete
          show={showModalDelete}
          onHide={handleCloseModalDelete}
          dataModal={dataModalDelete}
          confirmDeleteUser={confirmDeleteUser}
        />
      )}
      {showModalAddEdit && (
        <ModalAddEdit
          show={showModalAddEdit}
          onHide={handleCloseModalAddEdit}
          action={actionModalAddEdit}
          dataModal={dataModalAddEdit}
        />
      )}
    </>
  );
};

export default Users;
