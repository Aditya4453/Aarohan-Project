import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CameraSelector from '../components/CameraSelector';
import { courseAPI, sessionAPI, attendanceAPI } from '../services/api';

const MarkAttendance = () => {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedStudents, setDetectedStudents] = useState([]);
  const [cameraStream, setCameraStream] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadSessions(selectedCourse);
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    try {
      const response = await courseAPI.getAll();
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]);
    }
  };

  const loadSessions = async (courseId) => {
    try {
      const response = await sessionAPI.getByCourse(courseId);
      setSessions(response.data || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
      setSessions([]);
    }
  };

  const handleCameraSelect = (cameraId, stream) => {
    setCameraStream(stream);
  };

  const startAutomatedAttendance = async () => {
    if (!selectedSession) {
      alert('Please select a session');
      return;
    }

    setIsProcessing(true);

    // Simulate automated detection
    // In real implementation, this would use face recognition
    const mockStudents = [
      { id: 1, name: 'Priya Sharma', roll: '2023CSE001', confidence: 98.5 },
      { id: 2, name: 'Amit Patel', roll: '2023CSE002', confidence: 96.2 },
      { id: 3, name: 'Sneha Reddy', roll: '2023CSE003', confidence: 97.8 },
      { id: 4, name: 'Rahul Verma', roll: '2023CSE004', confidence: 95.3 },
    ];

    // Simulate progressive detection
    for (let i = 0; i < mockStudents.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDetectedStudents(prev => [...prev, mockStudents[i]]);

      // Mark attendance in backend
      try {
        await attendanceAPI.markAttendance({
          student_id: mockStudents[i].id,
          session_id: selectedSession,
          status: 'present',
          confidence: mockStudents[i].confidence,
        });
      } catch (error) {
        console.error('Error marking attendance:', error);
      }
    }

    setIsProcessing(false);
  };

  const stopProcess = () => {
    setIsProcessing(false);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Mark Attendance</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Section */}
        <div>
          <CameraSelector onCameraSelect={handleCameraSelect} />
        </div>

        {/* Session Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Session Details</h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Course:
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- Select Course --</option>
              {courses.map(course => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Session:
            </label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={!selectedCourse}
            >
              <option value="">-- Select Session --</option>
              {sessions.map(session => (
                <option key={session.session_id} value={session.session_id}>
                  {session.date} - {session.start_time} to {session.end_time}
                </option>
              ))}
            </select>
          </div>

          {!isProcessing ? (
            <button
              onClick={startAutomatedAttendance}
              className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600"
              disabled={!selectedSession || !cameraStream}
            >
              ⚡ Start Automated Attendance
            </button>
          ) : (
            <button
              onClick={stopProcess}
              className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600"
            >
              🛑 Stop Process
            </button>
          )}
        </div>
      </div>

      {/* Detection Panel */}
      {isProcessing && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Live Detection</h3>
          <div className="space-y-2">
            {detectedStudents.map((student, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                <div>
                  <p className="font-bold">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.roll}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">✓ Present</p>
                  <p className="text-sm text-gray-600">Confidence: {student.confidence}%</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold">
              Detected: {detectedStudents.length} students
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MarkAttendance;
