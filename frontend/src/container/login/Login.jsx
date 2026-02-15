import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance.jsx";
import extractFormData from "../../util/extractFormData.jsx";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const onSignupClicked = async (event) => {
    try {
      event.preventDefault();
      let data = extractFormData(event.target);
      const response = await axiosInstance.post("/user/login", data);

      alert(response?.data?.message);
      if (response?.data?.success) {
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        if (response?.data?.data?.userType == "student") {
          navigate("/app/dashboard");
        } else {
          navigate("/app/teacher-dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`vh-100 vw-100 d-flex justify-content-center align-items-center ${styles.body} ${theme === "light" ? styles.light : styles.dark}`}
      data-theme={theme}
    >
      <div className={`w-50 rounded border shadow ${styles.signUpCard}`}>
        <div className="position-absolute top-0 end-0 m-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i
              className={`bi ${theme === "dark" ? "bi-sun-fill" : "bi-moon-fill"}`}
            />
          </button>
        </div>
        <form
          className={`py-0 px-1 text-info h-100 w-100px`}
          onSubmit={onSignupClicked}
        >
          <p className={`display-5 ${styles.signupHeading}`}>Login</p>
          <div className={`${styles.signupBody}`}>
            <div className="form-floating mt-2">
              <input name="phone" className="form-control" required />
              <label>Phone:</label>
            </div>
            <div className={`form-floating mt-3 ${styles.passwordDiv}`}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                required
              />
              <label>Password:</label>
              <i
                className={`bi bi-eye${showPassword ? "" : "-slash"}-fill ${
                  styles.passwordToggle
                }`}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              ></i>
            </div>
          </div>
          <div
            className={`mt-0 ${styles.signupFooter} d-flex justify-content-center align-items-center flex-column`}
          >
            <button type="submit" className={`btn btn-primary w-100`}>
              Login
            </button>
            <button
              type="button"
              className={`btn btn-info w-100 mt-2`}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Goto SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
