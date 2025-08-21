import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { fetchAllRoles, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    refToGetAllRoles: async () => {
      await getAllRoles();
    },
  }));

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

  const handleEditRole = (role) => {};

  const handleDeleteRole = async (role) => {
    let res = await deleteRole(role.id);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      await getAllRoles();
    } else if (res && +res.EC !== 0) {
      toast.error(res.EM);
    } else {
      toast.error("An error happened when deleting role!");
    }
  };
  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>
                    <td>
                      <span
                        title="Edit"
                        className="edit"
                        onClick={() => handleEditRole(item)}
                      >
                        <i className="fa fa-pencil mx-3"></i>
                      </span>
                      <span
                        title="Delete"
                        className="delete"
                        onClick={() => handleDeleteRole(item)}
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
                <td colSpan={4}>Not Found Roles</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
});

export default TableRole;
