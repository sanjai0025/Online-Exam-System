import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            // Use React Router navigation instead of window.location
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// ----------- Authentication Endpoints -----------
export const login = (credentials) => 
    apiClient.post('/auth/login', credentials);

export const register = (userData) => 
    apiClient.post('/auth/register', userData);

export const logout = () => 
    apiClient.post('/auth/logout');

// ----------- Teacher Endpoints -----------
export const createExam = (examData) =>
    apiClient.post('/teacher/exams', examData);

export const addQuestionToExam = (examId, questionData) =>
    apiClient.post(`/teacher/exams/${examId}/questions`, questionData);

export const getExamsByTeacher = (teacherUsername) =>
    apiClient.get('/teacher/exams', { params: { createdBy: teacherUsername } });

export const activateExam = (examId) =>
    apiClient.patch(`/teacher/exams/${examId}/status`, { isActive: true });

export const deactivateExam = (examId) =>
    apiClient.patch(`/teacher/exams/${examId}/status`, { isActive: false });

export const getExamById = (examId) =>
    apiClient.get(`/teacher/exams/${examId}`);

export const getTeacherExamResults = (examId) =>
    apiClient.get(`/teacher/exams/${examId}/results`);

export const getAllQuestions = () =>
    apiClient.get('/teacher/questions');

export const getQuestionsByTeacher = (teacherUsername) =>
    apiClient.get('/teacher/questions', { params: { createdBy: teacherUsername } });

// ----------- Student Endpoints -----------
export const getAvailableExams = () =>
    apiClient.get('/student/exams');

export const startExam = (examId, studentUsername) =>
    apiClient.post(`/student/exams/${examId}/start`, { studentUsername });

export const submitAnswer = (studentExamId, questionId, selectedOption) =>
    apiClient.post(`/student/exams/${studentExamId}/answers`, {
        questionId,
        selectedOption,
    });

export const completeExam = (studentExamId) =>
    apiClient.post(`/student/exams/${studentExamId}/complete`);

export const getStudentExamResults = (studentExamId) =>
    apiClient.get(`/student/exams/${studentExamId}/results`);

export const getCompletedExams = (studentUsername) =>
    apiClient.get(`/student/exams/completed/${studentUsername}`);

// Default export
const apiExports = {
    login,
    register,
    logout,
    createExam,
    addQuestionToExam,
    getExamsByTeacher,
    activateExam,
    deactivateExam,
    getExamById,
    getAvailableExams,
    startExam,
    submitAnswer,
    completeExam,
    getTeacherExamResults,
    getStudentExamResults,
    getCompletedExams,
    getAllQuestions,
    getQuestionsByTeacher,
};

export default apiExports;
