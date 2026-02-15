import { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import extractFormData from "../../util/extractFormData";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Rating.module.css";

const Rating = () => {
  const [userData, setUserData] = useState(null);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    getRating(user?._id);
  }, []);

  const getRating = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/rating/get-rating?user=${userId}`
      );
      if (response?.data?.success) {
        setRating(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRatingChanged = async (ele, rating) => {
    try {
      if (!ele?.event?.isActiveRating) {
        alert("Event is not open for rating!!");
        return;
      }
      const response = await axiosInstance.put(
        `/rating/update-rating?_id=${ele?._id}`,
        { rating: rating }
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        getRating(userData?._id);
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
            <th>Name</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rating?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele?.event?.name}</td>
                <td>
                  <i
                    className={`bi bi-star${ele?.rating >= 1 ? "-fill" : ""}`}
                    onClick={() => {
                      onRatingChanged(ele, 1);
                    }}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 2 ? "-fill" : ""}`}
                    onClick={() => {
                      onRatingChanged(ele, 2);
                    }}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 3 ? "-fill" : ""}`}
                    onClick={() => {
                      onRatingChanged(ele, 3);
                    }}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 4 ? "-fill" : ""}`}
                    onClick={() => {
                      onRatingChanged(ele, 4);
                    }}
                  ></i>
                  <i
                    className={`bi bi-star${ele?.rating >= 5 ? "-fill" : ""}`}
                    onClick={() => {
                      onRatingChanged(ele, 5);
                    }}
                  ></i>
                </td>
                <td>{ele?.event?.isActiveRating ? "ON" : "OFF"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Rating;
