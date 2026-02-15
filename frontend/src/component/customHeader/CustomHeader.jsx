import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./CustomHeader.module.css";
import Button from "react-bootstrap/esm/Button";

const CustomHeader = (props) => {
  const navigate = useNavigate();
  return (
    <Navbar
      style={{ height: "100%" }}
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary shadow"
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <div>
            <img
              style={{ height: "40px" }}
              className="img img-fluid me-2"
              src={"/logo.png"}
            />
           Academic Notes Management 
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {props?.userData?.userType == "student" && (
              <>
                <Link className={` ${styles.navLink}`} to={"/app/dashboard"}>
                  Home
                </Link>
                <Link className={`${styles.navLink}`} to={"/app/notes"}>
                  Notes
                </Link>
                <Link className={`${styles.navLink}`} to={"/app/notification"}>
                  Notification
                </Link>
                <Link className={`${styles.navLink}`} to={"/app/rating"}>
                  Rating
                </Link>
              </>
            )}

            {props?.userData?.userType == "teacher" && (
              <>
                <Link
                  className={`${styles.navLink}`}
                  to={"/app/teacher-dashboard"}
                >
                  Home
                </Link>
                <Link className={`${styles.navLink}`} to={"/app/teacher-notes"}>
                  Notes
                </Link>
                <Link
                  className={`${styles.navLink}`}
                  to={"/app/teacher-notification"}
                >
                  Notification
                </Link>
                <Link className={`${styles.navLink}`} to={"/app/event"}>
                  Event
                </Link>
              </>
            )}

            <Link
              className={`${styles.navLink}`}
              to={"/app/profile"}
            >
              Profile
            </Link>
          </Nav>
          <Nav>
            <Button className="bt btn-danger" onClick={()=>{
              localStorage.clear();
              navigate("/");
            }}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomHeader;
