import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { Rings } from "react-loader-spinner";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
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
      </Router>
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
  );
}

export default App;
