import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { Rings } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";

const App = () => {
  const { user } = useContext(UserContext);
  const [scrollDimension, setScrollDimension] = useState({});

  useEffect(() => {
    setScrollDimension({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
  }, [user]);
  return (
    <Scrollbars
      autoHide
      style={{
        height: scrollDimension.windowHeight,
        width: scrollDimension.windowWidth,
      }}
    >
      <>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings heigth="72" width="72" color="#0d6efd" ariaLabel="loading" />
            <div>Loading Data...</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <Navigation />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </>
    </Scrollbars>
  );
};

export default App;
