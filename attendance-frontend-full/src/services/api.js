import axios from 'axios';

// Base URL for backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Mock data for offline development
const MOCK_MODE = true; // Set to false when backend is ready

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data
const mockCourses = [
  { course_id: 1, course_name: 'Data Structures', description: 'Introduction to data structures and algorithms' },
  { course_id: 2, course_name: 'Database Systems', description: 'SQL, NoSQL, and database design' },
  { course_id: 3, course_name: 'Web Development', description: 'React, Node.js, and full-stack development' },
];

const mockSessions = [
  { session_id: 1, course_id: 1, date: '2024-01-15', start_time: '09:00', end_time: '10:30' },
  { session_id: 2, course_id: 1, date: '2024-01-17', start_time: '09:00', end_time: '10:30' },
  { session_id: 3, course_id: 2, date: '2024-01-16', start_time: '11:00', end_time: '12:30' },
  { session_id: 4, course_id: 3, date: '2024-01-18', start_time: '14:00', end_time: '15:30' },
];

const mockAttendance = [
  { attendance_id: 1, student_id: 2, student_name: 'Demo Student', roll: '2023CSE001', session_id: 1, status: 'present', date: '2024-01-15', time: '09:15' },
  { attendance_id: 2, student_id: 2, student_name: 'Demo Student', roll: '2023CSE001', session_id: 2, status: 'present', date: '2024-01-17', time: '09:10' },
  { attendance_id: 3, student_id: 2, student_name: 'Demo Student', roll: '2023CSE001', session_id: 3, status: 'absent', date: '2024-01-16', time: '11:00' },
  { attendance_id: 4, student_id: 2, student_name: 'Demo Student', roll: '2023CSE001', session_id: 4, status: 'present', date: '2024-01-18', time: '14:05' },
];

// Helper to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export const userAPI = {
  getProfile: async () => {
    if (MOCK_MODE) {
      await delay();
      const userData = localStorage.getItem('user');
      if (userData) {
        return { data: JSON.parse(userData) };
      }
      return { data: { id: 1, name: 'Demo User', email: 'demo@test.com', role: 'teacher' } };
    }
    try {
      return await api.get('/users/profile');
    } catch (error) {
      console.error('API Error, using mock data:', error);
      await delay();
      const userData = localStorage.getItem('user');
      if (userData) {
        return { data: JSON.parse(userData) };
      }
      return { data: { id: 1, name: 'Demo User', email: 'demo@test.com', role: 'teacher' } };
    }
  },
  updateProfile: (data) => api.put('/users/profile', data),
};

export const studentAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  getAttendance: (id) => api.get(`/students/${id}/attendance`),
};

export const teacherAPI = {
  getAll: () => api.get('/teachers'),
  getById: (id) => api.get(`/teachers/${id}`),
};

export const courseAPI = {
  getAll: async () => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockCourses };
    }
    try {
      return await api.get('/courses');
    } catch (error) {
      console.error('API Error, using mock data:', error);
      await delay();
      return { data: mockCourses };
    }
  },
  getById: async (id) => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockCourses.find(c => c.course_id === id) };
    }
    try {
      return await api.get(`/courses/${id}`);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
};

export const sessionAPI = {
  getAll: async () => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockSessions };
    }
    try {
      return await api.get('/sessions');
    } catch (error) {
      console.error('API Error, using mock data:', error);
      await delay();
      return { data: mockSessions };
    }
  },
  getById: async (id) => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockSessions.find(s => s.session_id === id) };
    }
    try {
      return await api.get(`/sessions/${id}`);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  getByCourse: async (courseId) => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockSessions.filter(s => s.course_id === parseInt(courseId)) };
    }
    try {
      return await api.get(`/sessions/course/${courseId}`);
    } catch (error) {
      console.error('API Error, using mock data:', error);
      await delay();
      return { data: mockSessions.filter(s => s.course_id === parseInt(courseId)) };
    }
  },
  create: (data) => api.post('/sessions', data),
};

export const attendanceAPI = {
  markAttendance: async (data) => {
    if (MOCK_MODE) {
      await delay(300);
      console.log('Mock: Marking attendance', data);
      return { data: { success: true, ...data } };
    }
    try {
      return await api.post('/attendance', data);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  getBySession: async (sessionId) => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockAttendance.filter(a => a.session_id === parseInt(sessionId)) };
    }
    try {
      return await api.get(`/attendance/session/${sessionId}`);
    } catch (error) {
      console.error('API Error, using mock data:', error);
      await delay();
      return { data: mockAttendance.filter(a => a.session_id === parseInt(sessionId)) };
    }
  },
  getByStudent: async (studentId) => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockAttendance.filter(a => a.student_id === parseInt(studentId)) };
    }
    try {
      return await api.get(`/attendance/student/${studentId}`);
    } catch (error) {
      console.error('API Error, using mock data:', error);
      await delay();
      return { data: mockAttendance.filter(a => a.student_id === parseInt(studentId)) };
    }
  },
  getBulk: async (filters) => {
    if (MOCK_MODE) {
      await delay();
      return { data: mockAttendance };
    }
    try {
      return await api.get('/attendance', { params: filters });
    } catch (error) {
      console.error('API Error, using mock data:', error);
      await delay();
      return { data: mockAttendance };
    }
  },
};

export const cameraAPI = {
  getAll: () => api.get('/cameras'),
  getByClassroom: (classroomId) => api.get(`/cameras/classroom/${classroomId}`),
  updateStatus: (id, status) => api.put(`/cameras/${id}/status`, { status }),
};

export const classroomAPI = {
  getAll: () => api.get('/classrooms'),
  getById: (id) => api.get(`/classrooms/${id}`),
};

export default api;
