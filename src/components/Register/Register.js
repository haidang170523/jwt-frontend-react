import "./Register.scss";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhoneNumber: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      history.push("/");
    }
  }, []);

  const handleLogin = () => {
    history.push("/login");
  };

  const isValid = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Email is required");
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Email is not valid");
      return false;
    }
    if (!phoneNumber) {
      setObjCheckInput({ ...defaultValidInput, isValidPhoneNumber: false });
      toast.error("Phone number is required");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Password and confirm password do not match");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (isValid() !== true) return;
    try {
      let response = await registerNewUser(
        email,
        phoneNumber,
        username,
        password
      );

      if (response && +response.EC === 0) {
        toast.success(response.EM);
        history.push("/login");
      } else if (response && +response.EC !== 0) {
        toast.error(response.EM);
      }
    } catch (error) {
      toast.error(error.EM);
    }
  };

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="register-container">
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
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Enter your email address here"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhoneNumber
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Enter your phoneNumber number here"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phoneNumber number here"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Enter your password here"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Re-enter your password here"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onKeyDown={(event) => handlePressEnter(event)}
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
