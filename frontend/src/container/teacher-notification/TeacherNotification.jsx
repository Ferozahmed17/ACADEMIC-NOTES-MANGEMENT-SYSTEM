import { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import extractFormData from "../../util/extractFormData";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./TeacherNotification.module.css";

const TeacherNotification = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    getNotification(user?._id);
  }, []);

  const showModalClick = (show) => {
    setShowModal(show);
  };

  const getNotification = async (userId = userData?._id) => {
    try {
      const response = await axiosInstance.get(
        `/notification/get-notification?user=${userId}`,
      );
      if (response?.data?.success) {
        setNotification(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteNotification = async (id) => {
    try {
      const confirmDel = window.confirm("Delete this notification?");
      if (!confirmDel) return;
      setDeletingId(id);
      const response = await axiosInstance.delete(
        `/notification/delete-notification?_id=${id}`,
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        await getNotification();
      }
    } catch (error) {
      console.log(error);
      const msg =
        error?.response?.data?.message || error?.message || "Failed to delete";
      alert(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const onNoteSaved = async (event) => {
    try {
      event.preventDefault();
      let data = extractFormData(event.target);
      const response = await axiosInstance.post(
        "/notification/add-notification",
        data,
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        getNotification();
        showModalClick(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`h-100 p-3 ${styles.notesMain}`}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Batch</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notification?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele?.title}</td>
                <td>{ele?.description}</td>
                <td>{ele?.batch}</td>
                <td>{ele?.branch}</td>
                <td>
                  <button
                    className={`btn btn-outline-danger actionBtn btn-delete`}
                    onClick={() => onDeleteNotification(ele?._id)}
                    disabled={deletingId === ele?._id}
                  >
                    {deletingId === ele?._id ? (
                      "Deleting..."
                    ) : (
                      <>
                        <i className="bi bi-trash" /> Delete
                      </>
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Button
        className={`btn btn-primary ${styles.notesAddBtn}`}
        onClick={() => {
          showModalClick(true);
        }}
      >
        <i className="bi bi-plus-lg"></i>
      </Button>

      <Modal
        show={showModal}
        onHide={() => {
          showModalClick(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={`py-2 px-5 h-100 w-100`} onSubmit={onNoteSaved}>
            <div className={`${styles.signupBody}`}>
              <div className="form-floating mt-3">
                <input name="title" className="form-control" required />
                <label>Title:</label>
              </div>
              <div className="form-floating mt-3">
                <input name="description" className="form-control" required />
                <label>Description:</label>
              </div>
              <div className=" mt-3">
                <label className="float-start p-1">Batch:</label>
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
              <div className="form-floating mt-3">
                <input
                  name="expiresAt"
                  className="form-control"
                  type="date"
                  required
                />
                <label>Expires At:</label>
              </div>
            </div>
            <div
              className={`mt-3 ${styles.signupFooter} d-flex justify-content-center align-items-center flex-column`}
            >
              <button type="submit" className={`btn btn-primary w-100`}>
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeacherNotification;
