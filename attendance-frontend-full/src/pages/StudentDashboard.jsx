// StudentDashboard placeholder
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { userAPI, attendanceAPI } from "../services/api";

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const student = await userAPI.getProfile();
      const res = await attendanceAPI.getByStudent(student.data.id);
      setAttendance(res.data || []);
    } catch (err) {
      console.error("Student dashboard error:", err);
      setAttendance([]);
    }
  };

  const presentCount = attendance.filter((a) => a.status === "present").length;
  const total = attendance.length;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Classes" value={total} color="blue" />
        <StatCard title="Present" value={presentCount} color="green" />
        <StatCard
          title="Attendance %"
          value={total ? ((presentCount / total) * 100).toFixed(1) : 0}
          color="yellow"
        />
      </div>
    </Layout>
  );
};

export default StudentDashboard;
