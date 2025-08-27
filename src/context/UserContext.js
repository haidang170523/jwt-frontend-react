import { createContext, useEffect, useState } from "react";
import { getUserInfor } from "../services/userService";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const UserContext = createContext(null);

const UserProvider = (props) => {
  const nonSecurePaths = ["/", "/login", "/about", "/register"];
  // User is the name of the "data" that gets stored in context
  const defaultUser = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(defaultUser);
  const location = useLocation();

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...defaultUser, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await getUserInfor();
    if (response && response.EC === 0) {
      let data = {
        isLoading: false,
        isAuthenticated: true,
        token: response.DT.accessToken,
        account: {
          groupWithRoles: response.DT.groupWithRoles,
          email: response.DT.email,
          username: response.DT.username,
        },
      };
      setUser(data);
    } else {
      setUser({ ...defaultUser, isLoading: false });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUser();
    } else {
      if (!nonSecurePaths.includes(location.pathname)) {
        fetchUser();
      } else {
        setUser({ ...defaultUser, isLoading: false });
      }
    }
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
