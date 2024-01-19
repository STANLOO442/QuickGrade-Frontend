import axios from "axios";
import { LeftImageWrapper } from "./Login_background";
import "./Login_style.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
interface Props {
  id_or_email: string;
  placeholder: string;
  form_title: string;
  backgroundImage: string;
  userType: string;
}

export function LoginPage(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const handleUserID = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId((event.currentTarget as HTMLInputElement).value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.currentTarget as HTMLInputElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("userRole: ", userId);
    try {
      const currentRoute = location.pathname;
      console.log("currentRoute: ", currentRoute);
      if (currentRoute === "/students/signin") {
        const res = await axios.post(`http://localhost:3000/students/login`, {
          matricNo: userId,
          password: password,
        });
        // checking the response
        if (res.status === 200 && res.data.successfulLogin) {
          navigate("/students/dashboard");
        } else if (
          (res.status === 200 && res.data.inValidPassword) ||
          res.data.studentNotFoundError ||
          res.data.internalServerError
        ) {
          navigate("/students/signin");
        }
      } else if (currentRoute === "/lecturers/signin") {
        const res = await axios.post(`http://localhost:3000/lecturers/login`, {
          employeeID: userId,
          password: password,
        });
        // checking the response
        if (res.status === 200 && res.data.successfulLogin) {
          navigate("/lecturers/dashboard");
        } else if (
          (res.status === 200 && res.data.inValidPassword) ||
          res.data.lecturerNotFoundError ||
          res.data.internalServerError
        ) {
          navigate("/lecturers/signin");
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    // redirect to a different page based on user type
  };
  console.log("Rendering LoginPage for lecturer_signin");
  return (
    <div className="main-body-wrapper">
      <div className="inner-body-wrapper">
        <LeftImageWrapper backgroundImage={props.backgroundImage}>
          <h1 className="university-title">Camouflage University</h1>
          <p className="moto-wrapper">Inspiring greatness through education</p>
        </LeftImageWrapper>

        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="form-title">{props.form_title}</h1>
            <div className="field">
              <label className="label">{props.id_or_email}</label>
              <input
                className="input"
                type="text"
                value={userId}
                onChange={handleUserID}
                placeholder={props.placeholder}
              />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="password-icon-wrapper">
                <i className="fa-solid fa-lock password-icon"></i>
                <input
                  className="password_input"
                  type="text"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Enter password"
                />
              </div>
              <Link className="forgot-password" to={props.userType}>
                {" "}
                forgot password?
              </Link>
            </div>
            <button className="sign-in-btn">Sign in</button>
          </form>
        </div>
      </div>
      <footer>
        <div className="inner-footer-wrapper">
          <div className="left-footer-text-wrapper">
            <p className="footer-text">QuickGrade</p>
          </div>
          <div className="center-footer-text-wrapper">
            <p className="footer-text">QuickGrade Inc. All rights Reserved</p>
          </div>
          <div className="right-footer-text-wrapper">
            <p className="footer-text privacy">Privacy</p>
            <p className="footer-text terms">Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}