// ViewAttendance placeholder
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AttendanceTable from "../components/AttendanceTable";
import { attendanceAPI } from "../services/api";

const ViewAttendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await attendanceAPI.getBulk({});
      setRecords(res.data || []);
    } catch (err) {
      console.error("Attendance fetch error:", err);
      setRecords([]);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">View Attendance</h1>
      <AttendanceTable records={records} />
    </Layout>
  );
};

export default ViewAttendance;
