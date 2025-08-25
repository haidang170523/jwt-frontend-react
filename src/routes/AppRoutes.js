import Users from "../components/ManageUsers/Users";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Roles from "../components/Roles/Roles";
import GroupRoles from "../components/GroupRoles/GroupRoles";

const AppRoutes = (props) => {
  const Projects = () => {
    return <div>Projects</div>;
  };
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Projects} />
        <PrivateRoutes path="/roles" component={Roles} />
        <PrivateRoutes path="/group-roles" component={GroupRoles} />
        <Route exact path="/">
          Home
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/about">
          About
        </Route>
        <Route path="*">404 Not Found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
