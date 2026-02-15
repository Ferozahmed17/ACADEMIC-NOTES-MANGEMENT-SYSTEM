import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import CustomPieChart from "../../component/custom-piechart/CustomPieChart";
import styles from "./TeacherDashboard.module.css";

const StatCard = ({ icon, label, count, onClick, accent }) => {
  return (
    <button
      className={`${styles.statCard} btn-reset`}
      onClick={onClick}
      aria-label={label}
    >
      <div className={`${styles.statIcon}`} style={{ background: accent }}>
        <i className={`bi ${icon}`} />
      </div>
      <div className={styles.statBody}>
        <div className={styles.statCount}>{count ?? 0}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </button>
  );
};

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [counts, setCounts] = useState({
    notes: 0,
    notifications: 0,
    events: 0,
    ratings: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    if (user) fetchCounts(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCounts = async (user) => {
    setLoading(true);
    try {
      const [notesRes, notifRes, eventsRes, ratingsRes] = await Promise.all([
        axiosInstance.get(`/note/get-note?user=${user._id}`),
        axiosInstance.get(`/notification/get-notification?user=${user._id}`),
        axiosInstance.get(`/event/get-event?user=${user._id}`),
        axiosInstance.get(`/rating/get-rating?user=${user._id}`),
      ]);

      setCounts({
        notes: notesRes?.data?.data?.length || 0,
        notifications: notifRes?.data?.data?.length || 0,
        events: eventsRes?.data?.data?.length || 0,
        ratings: ratingsRes?.data?.data?.length || 0,
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className={`h-100 p-3  ${styles.dashboardMain}`}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>
            Welcome back, {userData?.name ?? "Teacher"}
          </h2>
          <p className="text-muted">Your content and activity at a glance.</p>
        </div>
        <div className={styles.headerActions}>
          <button
            className="btn btn-outline-light bg-primary me-2"
            onClick={() => navigate("/app/teacher-notes")}
          >
            My Notes
          </button>
          <button
            className="btn btn-outline-light bg-primary"
            onClick={() => navigate("/app/teacher-notification")}
          >
            Create Notification
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          icon="bi-journal-text"
          label="My Notes"
          count={loading ? "—" : counts.notes}
          onClick={() => navigate("/app/teacher-notes")}
          accent="linear-gradient(135deg,#646cff,#5dd1ff)"
        />
        <StatCard
          icon="bi-bell"
          label="Notifications"
          count={loading ? "—" : counts.notifications}
          onClick={() => navigate("/app/teacher-notification")}
          accent="linear-gradient(135deg,#ff6b6b,#ffb86b)"
        />
        <StatCard
          icon="bi-calendar-event"
          label="Events"
          count={loading ? "—" : counts.events}
          onClick={() => navigate("/app/event")}
          accent="linear-gradient(135deg,#6be3a0,#34a0ff)"
        />
        <StatCard
          icon="bi-star-fill"
          label="Ratings"
          count={loading ? "—" : counts.ratings}
          onClick={() => navigate("/app/rating")}
          accent="linear-gradient(135deg,#ffd36b,#ff7ab6)"
        />
      </div>

      <div className={styles.chartWrap}>
        <CustomPieChart />
      </div>
    </div>
  );
};

export default TeacherDashboard;
