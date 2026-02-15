import { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import axiosInstanceBinary from "../../util/axiosInstanceBinary";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./TeacherNotes.module.css";

const TeacherNotes = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    getNotes(user?._id);
  }, []);

  const showModalClick = (show) => {
    setShowModal(show);
  };

  const getNotes = async (userId = userData?._id) => {
    try {
      const response = await axiosInstance.get(`/note/get-note?user=${userId}`);
      if (response?.data?.success) {
        setNotes(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Teacher: delete a note
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const response = await axiosInstance.delete(
        `/note/delete-note?_id=${id}`,
      );
      alert(response?.data?.message || "Note deleted");
      if (response?.data?.success) {
        getNotes(userData?._id);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  };

  // Teacher: edit state + handlers
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const openEdit = (note) => {
    setEditNote(note);
    setEditForm({
      title: note?.title || "",
      description: note?.description || "",
    });
    setShowEditModal(true);
  };

  const closeEdit = () => {
    setShowEditModal(false);
    setEditNote(null);
    setEditForm({ title: "", description: "" });
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/note/update-note?_id=${editNote?._id}`,
        editForm,
      );
      alert(response?.data?.message || "Note updated");
      if (response?.data?.success) {
        await getNotes(userData?._id);
        closeEdit();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update note.");
    }
  };

  const onNoteSaved = async (event) => {
    try {
      event.preventDefault();
      let formData = new FormData(event.target);
      // ensure backend receives the owner/branch if session is not available
      if (userData?._id) formData.append("user", userData._id);
      if (userData?.branch) formData.append("branch", userData.branch);

      const response = await axiosInstanceBinary.post(
        "/note/add-note",
        formData,
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        // explicitly refresh notes for current user
        await getNotes(userData?._id);
        showModalClick(false);
      }
    } catch (error) {
      console.log(error);
      const serverMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save note";
      alert(serverMessage);
    }
  };

  return (
    <div className={`h-100 p-3 ${styles.notesMain}`}>
      <Table striped bordered hover className="notes-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Batch</th>
            <th>Branch</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele?.title}</td>
                <td>{ele?.description}</td>
                <td>{ele?.batch}</td>
                <td>{ele?.branch}</td>
                <td>
                  <a href={ele?.url} target="_blank">
                    <i className="bi bi-eye-fill"></i>
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => openEdit(ele)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(ele?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Button
        aria-label="Add note"
        className={`btn btn-primary ${styles.notesAddBtn} fab-btn`}
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
              <div className="mt-3">
                <input
                  name="noteFile"
                  className="form-control"
                  type="file"
                  required
                />
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
            </div>
            <div
              className={`mt-3 ${styles.signupFooter} d-flex justify-content-center align-items-center flex-column`}
            >
              <button
                type="submit"
                className={`btn btn-primary w-100 btn-save`}
              >
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        show={showEditModal}
        onHide={closeEdit}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={`py-2 px-5 h-100 w-100`} onSubmit={onEditSubmit}>
            <div className={`${styles.signupBody}`}>
              <div className="form-floating mt-3">
                <input
                  name="title"
                  className="form-control"
                  required
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <label>Title:</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  name="description"
                  className="form-control"
                  required
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <label>Description:</label>
              </div>
            </div>
            <div
              className={`mt-3 ${styles.signupFooter} d-flex justify-content-center align-items-center flex-column`}
            >
              <button
                type="submit"
                className={`btn btn-primary w-100 btn-save`}
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeacherNotes;
