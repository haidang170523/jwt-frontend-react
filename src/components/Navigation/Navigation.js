import "./Navigation.scss";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  Link,
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../../image/logo.svg";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const Navigation = (props) => {
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
  const { user, logoutContext } = useContext(UserContext);
  const nonNavPaths = ["/login", "/register", "/logout"];
  const history = useHistory();

  const handleLogout = async () => {
    try {
      let res = await logoutUser();
      if (res && +res.EC === 0) {
        localStorage.removeItem("jwt");
        logoutContext();
        toast.success(res.EM);
        history.push("/login");
      } else {
        toast.error(res.EM);
      }
    } catch (error) {
      toast.error("An error occurred while logging out");
      console.error(error);
    }
  };
  if (
    (user && user.isAuthenticated === true) ||
    !nonNavPaths.includes(location.pathname)
  ) {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
                {"  "}
                <span className="brand-name">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    User
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Role
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Project
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-text me-auto">
                        Welcome {user.account.username} !
                      </Nav.Item>
                      <NavDropdown title="⚙ Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Navigation;
