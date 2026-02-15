import { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import extractFormData from "../../util/extractFormData";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Notification.module.css";

const Notification = () => {
  const [userData, setUserData] = useState(null);
  const [notification, setNotification] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    getNotification(user?.batch, user?.branch);
  }, []);

  const getNotification = async (
    batch = userData?.batch,
    branch = userData?.branch,
  ) => {
    try {
      const response = await axiosInstance.get(
        `/notification/get-notification?batch=${batch}&&branch=${branch}`,
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
    </div>
  );
};

export default Notification;
