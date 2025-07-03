import "./Login.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = (props) => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const isValid = () => {
    setObjCheckInput(defaultValidInput);
    if (!valueLogin) {
      setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      toast.error("Please enter your email or phone number");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (isValid() === true) {
      let response = await loginUser(valueLogin, password);
      if (response && response.data && +response.data.EC === 0) {
        toast.success(response.data.EM);
        let data = {
          isAuthenticated: true,
          token: "fake token",
        };
        sessionStorage.setItem("account", JSON.stringify(data));
        history.push("/users");
        window.location.reload();
      }
      if (response && response.data && +response.data.EC !== 0) {
        toast.error(response.data.EM);
      }
    }
  };

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault(); // Prevent submit form = enter
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left d-none col-sm-7 d-sm-block">
            <div className="brand">lighthouse23_</div>
            <div className="detail">
              lighthouse23_ helps you connect and share with the people in your
              life
            </div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">lighthouse23_</div>
            <input
              type="text"
              className={
                objCheckInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className={
                objCheckInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
