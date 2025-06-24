import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Register = (props) => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
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
                type="text"
                className="form-control"
                placeholder="Enter your email address here"
              />
            </div>

            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number here"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password here"
              />
            </div>

            <div className="form-group">
              <label>Re-enter password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter your password here"
              />
            </div>

            <button className="btn btn-primary">Register</button>

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
