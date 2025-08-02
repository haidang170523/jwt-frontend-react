import { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = createContext(null);

const UserProvider = (props) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: "",
    account: {},
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser((user) => ({
      isAuthenticated: false,
      token: "",
      account: {},
    }));
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let data = {
        isAuthenticated: true,
        token: response.DT.accessToken,
        account: {
          groupWithRoles: response.DT.groupWithRoles,
          email: response.DT.email,
          username: response.DT.username,
        },
      };
      setUser(data);
    }
    // console.log(">>> Check data from server", response);
  };

  useEffect(() => fetchUser(), []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
