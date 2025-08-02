import "./Nav.scss";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// Naivigation Bar Component
const Nav = (props) => {
  // const [isShow, setIsShow] = useState(false);
  // let location = useLocation();
  // useEffect(() => {
  //   if (location.pathname === "/login" || location.pathname === "/register") {
  //     setIsShow(false);
  //   } else {
  //     setIsShow(true);
  //   }
  // }, [location]);

  const location = useLocation();
  const { user } = useContext(UserContext);
  if (
    (user && user.isAuthenticated === true) ||
    location.pathname === "/" ||
    location.pathname === "/about"
  ) {
    return (
      <>
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Nav;
