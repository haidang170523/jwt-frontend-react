import { createContext, useEffect, useState } from "react";
import { getUserInfor } from "../services/userService";

const UserContext = createContext(null);

const UserProvider = (props) => {
  const nonSecurePaths = ["/", "/login", "/about"];
  // User is the name of the "data" that gets stored in context
  const defaultUser = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(defaultUser);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser((user) => ({
      isLoading: true,
      isAuthenticated: false,
      token: "",
      account: {},
    }));
  };

  const fetchUser = async () => {
    let response = await getUserInfor();
    if (response && response.EC === 0) {
      // alert("Me");
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
      // alert("Alo");
      setUser({ ...defaultUser, isLoading: false });
    }
  };

  useEffect(() => {
    if (!nonSecurePaths.includes(window.location.pathname)) {
      fetchUser();
    } else {
      setUser({ ...defaultUser, isLoading: false });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
