import { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import extractFormData from "../../util/extractFormData";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Event.module.css";

const Event = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState([]);
  const [rating, setRating] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    getEvents(user?._id);
  }, []);

  const showModalClick = (show) => {
    setShowModal(show);
  };

  const showRatingModalClick = (show) => {
    setShowRatingModal(show);
  };

  const getEvents = async (userId = userData?._id) => {
    try {
      const response = await axiosInstance.get(
        `/event/get-event?user=${userId}`,
      );
      if (response?.data?.success) {
        setEvent(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRating = async (eventId) => {
    try {
      const response = await axiosInstance.get(
        `/rating/get-rating?event=${eventId}`,
      );
      if (response?.data?.success) {
        setRating(response?.data?.data);
        setShowRatingModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEventSaved = async (event) => {
    try {
      event.preventDefault();
      let data = extractFormData(event.target);
      const response = await axiosInstance.post("/event/add-event", data);
      alert(response?.data?.message);
      if (response?.data?.success) {
        getEvents();
        showModalClick(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onStatusChanged = async (eventId, status) => {
    try {
      const response = await axiosInstance.put(
        `/event/update-event?_id=${eventId}`,
        { isActiveRating: status },
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        getEvents();
        showModalClick(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteEvent = async (eventId) => {
    try {
      const confirmDel = window.confirm(
        "Are you sure you want to delete this event?",
      );
      if (!confirmDel) return;
      setDeletingId(eventId);
      const response = await axiosInstance.delete(
        `/event/delete-event?_id=${eventId}`,
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        await getEvents();
      }
    } catch (error) {
      console.log(error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete event";
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
            <th>Name</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {event?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele?.name}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      getRating(ele?._id);
                    }}
                  >
                    Show
                  </button>
                </td>
                <td className="d-flex gap-2">
                  {ele?.isActiveRating ? (
                    <button
                      className="btn btn-danger actionBtn"
                      onClick={() => {
                        onStatusChanged(ele?._id, !ele?.isActiveRating);
                      }}
                    >
                      Turn Off
                    </button>
                  ) : (
                    <button
                      className="btn btn-success actionBtn"
                      onClick={() => {
                        onStatusChanged(ele?._id, !ele?.isActiveRating);
                      }}
                    >
                      Turn On
                    </button>
                  )}

                  <button
                    className={`btn btn-outline-danger actionBtn btn-delete`}
                    onClick={() => onDeleteEvent(ele?._id)}
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={`py-2 px-5 h-100 w-100`} onSubmit={onEventSaved}>
            <div className={`${styles.signupBody}`}>
              <div className="form-floating mt-3">
                <input name="name" className="form-control" required />
                <label>Title:</label>
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

      <Modal
        show={showRatingModal}
        onHide={() => {
          showRatingModalClick(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Ratings</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll" }}>
          {rating?.map((ele, index) => {
            return (
              <div
                style={{ height: "50px" }}
                className="mt-2 w-100 card rounded shadow bg-light d-flex justify-content-between align-items-center flex-row"
              >
                {ele?.user?.name}
                <div>
                  <i
                    className={`bi bi-star${ele?.rating >= 1 ? "-fill" : ""}`}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 2 ? "-fill" : ""}`}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 3 ? "-fill" : ""}`}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 4 ? "-fill" : ""}`}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 5 ? "-fill" : ""}`}
                  ></i>
                </div>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Event;
