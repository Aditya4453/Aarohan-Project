// AttendanceTable component placeholder
import React from "react";

const AttendanceTable = ({ records = [] }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 font-semibold">Student Name</th>
            <th className="p-3 font-semibold">Roll No</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{r.student_name || r.name || 'N/A'}</td>
              <td className="p-3">{r.roll || r.roll_no || 'N/A'}</td>
              <td
                className={`p-3 font-semibold ${
                  r.status === "present" ? "text-green-600" : "text-red-600"
                }`}
              >
                {r.status || 'N/A'}
              </td>
              <td className="p-3">{r.date || new Date(r.created_at || Date.now()).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {records.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No attendance records found.</p>
      )}
    </div>
  );
};

export default AttendanceTable;
