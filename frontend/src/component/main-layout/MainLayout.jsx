import styles from "./MainLayout.module.css";
import CustomHeader from "../customHeader/CustomHeader";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainLayout = (props) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, [props?.userData, location.pathname]);

  return (
    <div className="vh-100 vw-100">
      <div className={`${styles.customHeader}`}>
        <CustomHeader userData={userData} />
      </div>
      <div className={`${styles.mainContent}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
