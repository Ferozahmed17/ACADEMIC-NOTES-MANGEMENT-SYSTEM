import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance.jsx";
import extractFormData from "../../util/extractFormData.jsx";
import styles from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const onSignupClicked = async (event) => {
    try {
      event.preventDefault();
      let data = extractFormData(event.target);
      const response = await axiosInstance.post("/user/add-user", data);

      alert(response?.data?.message);
      if (response?.data?.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`vh-100 vw-100 d-flex justify-content-center align-items-center`}
    >
      <div
        className={`w-50 h-75 bg-light rounded border shadow ${styles.signUpCard}`}
      >
        <form className={`py-2 px-5 h-100 w-100`} onSubmit={onSignupClicked}>
          <p className={`display-4 ${styles.signupHeading}`}>SignUp</p>
          <div className={`${styles.signupBody}`}>
            <div className="form-floating mt-3">
              <input name="name" className="form-control" required />
              <label>Name:</label>
            </div>
            <div className="form-floating mt-3">
              <input name="email" className="form-control" required />
              <label>Email:</label>
            </div>
            <div className="form-floating mt-3">
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
            <div className=" mt-3">
              <label className="float-start p-1">UserType:</label>
              <select
                name="userType"
                className="form-select"
                onChange={(e) => {
                  setIsStudent(e.target.value == "student");
                }}
                defaultValue={"student"}
                required
              >
                <option value={"student"}>Student</option>
                <option value={"teacher"}>Teacher</option>
              </select>
            </div>
            <div className=" mt-3">
              <label className="float-start p-1">Branch:</label>
              <select
                name="branch"
                className="form-select"
                defaultValue={"MCA"}
                required
              >
                <option value={"MCA"}>MCA</option>
                <option value={"BCA"}>BCA</option>
                <option value={"BSC"}>BSC</option>
                <option value={"BA"}>BA</option>
                <option value={"B.COM"}>B.COM</option>
                <option value={"CSE"}>CSE</option>
                <option value={"EEE"}>EEE</option>
                <option value={"ECE"}>ECE</option>
                <option value={"ISE"}>ISE</option>
                <option value={"AI/ML"}>AI/ML</option>
                <option value={"ME"}>ME</option>
                <option value={"CIV"}>CIV</option>
              </select>
            </div>
            {isStudent && (
              <div className=" mt-3">
                <label className="float-start p-1">Branch:</label>
                <select
                  name="batch"
                  className="form-select"
                  defaultValue={"2024"}
                  required
                >
                  <option value={"2024"}>2024</option>
                  <option value={"2025"}>2025</option>
                </select>
              </div>
            )}
            {isStudent ? (
              <div className="form-floating mt-3">
                <input name="sudentUsn" className="form-control" required />
                <label>USN:</label>
              </div>
            ) : (
              <div className="form-floating mt-3">
                <input name="teacherId" className="form-control" required />
                <label>EMP ID:</label>
              </div>
            )}
          </div>
          <div
            className={`mt-3 ${styles.signupFooter} d-flex justify-content-center align-items-center flex-column`}
          >
            <button type="submit" className={`btn btn-primary w-100`}>
              Sign Up
            </button>
            <button
              type="button"
              className={`btn btn-info w-100 mt-2`}
              onClick={() => {
                navigate("/");
              }}
            >
              Goto Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
