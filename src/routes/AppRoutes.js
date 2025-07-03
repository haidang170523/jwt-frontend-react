import Users from "../components/ManageUsers/Users";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
  const Projects = () => {
    return <div>Projects</div>;
  };
  return (
    <>
      <Switch>
        {/* <Route path="/project">project</Route>
        <Route path="/users">
          <Users />
        </Route> */}

        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Projects} />
        <Route exact path="/">
          home
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">404 Not Found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
