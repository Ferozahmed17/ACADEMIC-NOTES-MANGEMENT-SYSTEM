import { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import Table from "react-bootstrap/Table";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    getNotes(user?.batch, user?.branch);
  }, []);

  const getNotes = async (
    batch = userData?.batch,
    branch = userData?.branch,
  ) => {
    try {
      const response = await axiosInstance.get(
        `/note/get-note?batch=${batch}&&branch=${branch}`,
      );
      if (response?.data?.success) {
        setNotes(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const response = await axiosInstance.delete(
        `/note/delete-note?_id=${id}`,
      );
      if (response?.data?.success) {
        // refresh notes for the current user
        getNotes();
        alert(response?.data?.message || "Note deleted");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  };

  return (
    <div className="h-100 p-3">
      <div className="notes-card p-3 rounded shadow-sm">
        <h3 className="mb-3">
          <i className="bi bi-journal-text me-2" />
          Notes <span className="notes-count">{notes?.length}</span>
        </h3>
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
                    <a
                      className="view-btn"
                      href={ele?.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bi bi-eye-fill" />
                    </a>
                  </td>
                  <td>
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
      </div>
    </div>
  );
};

export default Notes;
