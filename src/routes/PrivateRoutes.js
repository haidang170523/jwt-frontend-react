import { Route, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  let history = useHistory();
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(">>> Check user: ", user);
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
      window.location.reload();
    } else {
    }
  }, []);
  return <Route path={props.path} component={props.component} />;
};

export default PrivateRoutes;
