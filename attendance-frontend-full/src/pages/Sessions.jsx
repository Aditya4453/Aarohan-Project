// Sessions placeholder
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { sessionAPI } from "../services/api";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await sessionAPI.getAll();
      setSessions(res.data || []);
    } catch (err) {
      console.error("Error loading sessions:", err);
      setSessions([]);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Sessions</h1>

      {sessions.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No sessions available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div
              key={s.session_id}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-gray-800">{s.date}</p>
                  <p className="text-gray-600 mt-1">
                    {s.start_time} ➝ {s.end_time}
                  </p>
                </div>
                {s.course_id && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Course ID: {s.course_id}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Sessions;
