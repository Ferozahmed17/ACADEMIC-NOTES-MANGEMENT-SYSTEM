import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./container/login/Login";
import Signup from "./container/signup/Signup";
import Profile from "./container/profile/Profile";
import TeacherDashboard from "./container/teacher-dashboard/TeacherDashboard";
import TeacherNotes from "./container/teacher-notes/TeacherNotes";
import TeacherNotification from "./container/teacher-notification/TeacherNotification";
import StudentDashboard from "./container/student-dashboard/StudentDashboard";
import Notes from "./container/notes/Notes";
import Notification from "./container/notification/Notification";
import "./App.css";
import MainLayout from "./component/main-layout/MainLayout";
import { useEffect, useState } from "react";
import Event from "./container/event/Event";
import Rating from "./container/rating/Rating";

const App = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<MainLayout userData={userData} />}>
          <Route path="/app/profile" element={<Profile />} />
          <Route path="/app/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/app/teacher-notes" element={<TeacherNotes />} />
          <Route
            path="/app/teacher-notification"
            element={<TeacherNotification />}
          />
          <Route path="/app/dashboard" element={<StudentDashboard />} />
          <Route path="/app/notes" element={<Notes />} />
          <Route path="/app/notification" element={<Notification />} />
          <Route path="/app/event" element={<Event />} />
          <Route path="/app/rating" element={<Rating />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
