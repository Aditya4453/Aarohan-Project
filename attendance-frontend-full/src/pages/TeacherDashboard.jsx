// TeacherDashboard placeholder
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { courseAPI, sessionAPI } from "../services/api";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const courseRes = await courseAPI.getAll();
      const sessionRes = await sessionAPI.getAll();
      setCourses(courseRes.data || []);
      setSessions(sessionRes.data || []);
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setCourses([]);
      setSessions([]);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Courses" value={courses.length} color="blue" />
        <StatCard title="Total Sessions" value={sessions.length} color="green" />
        <StatCard title="Pending Tasks" value="03" color="yellow" />
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
