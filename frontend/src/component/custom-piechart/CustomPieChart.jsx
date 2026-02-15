import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";

const COLORS = ["#ff7300", "#387908"];

export default function CustomPieChart() {
  const [userData, setUserData] = useState(null);
  let [notesPieChartData, setNotesPieChartData] = useState([]);
  let [notificationPieChartData, setNotificationPieChartData] = useState([]);

  const getNotes = async (userId) => {
    try {
      let response = await axiosInstance.get(`/note/get-note?user=${userId}`);
      let batchWiseNotes = {};

      for (let i = 0; i < response?.data?.data?.length; i++) {
        if (batchWiseNotes?.[response?.data?.data?.[i]?.batch]) {
          batchWiseNotes[response?.data?.data?.[i]?.batch] += 1;
        } else {
          batchWiseNotes[response?.data?.data?.[i]?.batch] = 1;
        }
      }

      let notesPieChartData = [];
      for (let i = 0; i < Object.keys(batchWiseNotes)?.length; i++) {
        notesPieChartData.push({
          name: Object.keys(batchWiseNotes)?.[i],
          value: batchWiseNotes[Object.keys(batchWiseNotes)?.[i]],
        });
      }
      setNotesPieChartData(notesPieChartData);
    } catch (error) {
      console.log(error);
    }
  };
  const getNotification = async (userId) => {
    try {
      let response = await axiosInstance.get(
        `/notification/get-notification?user=${userId}`,
      );
      let batchWiseNotes = {};

      for (let i = 0; i < response?.data?.data?.length; i++) {
        if (batchWiseNotes?.[response?.data?.data?.[i]?.batch]) {
          batchWiseNotes[response?.data?.data?.[i]?.batch] += 1;
        } else {
          batchWiseNotes[response?.data?.data?.[i]?.batch] = 1;
        }
      }

      let notesPieChartData = [];
      for (let i = 0; i < Object.keys(batchWiseNotes)?.length; i++) {
        notesPieChartData.push({
          name: Object.keys(batchWiseNotes)?.[i],
          value: batchWiseNotes[Object.keys(batchWiseNotes)?.[i]],
        });
      }
      setNotificationPieChartData(notesPieChartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
    getNotes(user?._id);
    getNotification(user?._id);
  }, []);
  return (
    <div className="chart-overview">
      <h2>Stats Overview</h2>

      <div className="chart-row">
        <div className="chart-card">
          <h3>Notes Summary</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={notesPieChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {notesPieChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Notification Summary</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={notificationPieChartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                label
              >
                {notificationPieChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
