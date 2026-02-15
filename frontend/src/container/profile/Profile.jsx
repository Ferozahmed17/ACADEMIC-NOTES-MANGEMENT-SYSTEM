import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance.jsx";
import extractFormData from "../../util/extractFormData.jsx";
import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const onSignupClicked = async (event) => {
    try {
      event.preventDefault();
      let data = extractFormData(event.target);
      const response = await axiosInstance.put(
        `/user/update-user?_id=${userData?._id}`,
        data,
      );

      alert(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
  }, []);

  return (
    <div
      className={`h-100 w-100 d-flex justify-content-center align-items-center`}
    >
      <div
        className={`w-100 h-100 bg-light rounded border shadow ${styles.signUpCard}`}
      >
        {userData && (
          <form className={`py-2 px-5 h-100 w-100`} onSubmit={onSignupClicked}>
            <div className={`${styles.signupBody}`}>
              <div className="form-floating mt-3">
                <input
                  name="name"
                  className="form-control"
                  required
                  defaultValue={userData?.name}
                />
                <label>Name:</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  name="email"
                  className="form-control"
                  disabled
                  defaultValue={userData?.email}
                />
                <label>Email:</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  name="phone"
                  className="form-control"
                  disabled
                  defaultValue={userData?.phone}
                />
                <label>Phone:</label>
              </div>
              <div className={`form-floating mt-3 ${styles.passwordDiv}`}>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  required
                  defaultValue={userData?.password}
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
                  disabled
                  name="userType"
                  className="form-select"
                  onChange={(e) => {
                    setIsStudent(e.target.value == "student");
                  }}
                  defaultValue={userData?.userType}
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
                  disabled
                  defaultValue={userData?.branch}
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
                  <label className="float-start p-1">batch:</label>
                  <select
                    name="batch"
                    className="form-select"
                    disabled
                    defaultValue={userData?.batch}
                  >
                    <option value={"2024"}>2024</option>
                    <option value={"2025"}>2025</option>
                  </select>
                </div>
              )}
              {isStudent ? (
                <div className="form-floating mt-3">
                  <input
                    name="sudentUsn"
                    className="form-control"
                    disabled
                    defaultValue={userData?.sudentUsn}
                  />
                  <label>USN:</label>
                </div>
              ) : (
                <div className="form-floating mt-3">
                  <input
                    name="teacherId"
                    className="form-control"
                    disabled
                    defaultValue={userData?.teacherId}
                  />
                  <label>EMP ID:</label>
                </div>
              )}
            </div>
            <div
              className={`mt-3 ${styles.signupFooter} d-flex justify-content-center align-items-center flex-column`}
            >
              <button type="submit" className={`btn btn-primary w-100`}>
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
