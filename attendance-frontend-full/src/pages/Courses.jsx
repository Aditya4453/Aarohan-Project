// Courses placeholder
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { courseAPI } from "../services/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await courseAPI.getAll();
      setCourses(res.data || []);
    } catch (err) {
      console.error("Error loading courses:", err);
      setCourses([]);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      {courses.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No courses available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.course_id} className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{c.course_name}</h3>
              <p className="text-gray-600">{c.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Courses;
