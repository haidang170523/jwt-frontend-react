import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  const isValid = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Email is not valid");
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    let check = isValid();
    // Don't declare key => user value as a key by default
    let userData = { email, phone, username, password };
    console.log("Check userData: ", userData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/test-api")
      .then((data) => {
        console.log("Check data axios: ", data);
      })
      .catch((err) => {
        console.log("Axios error: ", err);
      });
  }, [2]);

  return (
    <div className="register-container">
      <div class="container">
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
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address here"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number here"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number here"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password here"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter your password here"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
              type="button"
            >
              Register
            </button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
