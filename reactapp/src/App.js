import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExamCreator from './components/ExamCreator';
import StudentExamList from './components/StudentExamList';
import ExamInterface from './components/ExamInterface';
import ExamResults from './components/ExamResults';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherExamResults from './components/TeacherExamResults';
import AllResults from './components/AllResults';
import ExamList from './components/ExamList';
import HelpSupport from './components/HelpSupport';
import Profile from './components/Profile';
import Settings from './components/Settings';
import StudentDashboard from './components/StudentDashboard';
import StudentResults from './components/StudentResults';
import QuestionBank from './components/QuestionBank';
import Login from './components/Login';
import Signup from './components/Signup';

// Import all styles
import './styles/index.css';
import './styles/navigation.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/forms.css';
import './styles/lists.css';
import './styles/exam.css';

function ProtectedRoute({ children, requiredRole }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            if (!requiredRole || parsedUser.role === requiredRole) {
                setUser(parsedUser);
            }
        }
        setLoading(false);
    }, [requiredRole]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        return <Login />;
    }

    return children;
}

function ExamInterfaceWrapper() {
    const location = useLocation();
    const params = useParams();
    
    if (!location.state) {
        return (
            <ExamInterface
                location={{
                    state: {
                        questions: [
                            {
                                questionId: 11,
                                questionText: 'Fallback Q1?',
                                optionA: 'A',
                                optionB: 'B',
                                optionC: 'C',
                                optionD: 'D',
                                marks: 2,
                            }
                        ],
                        exam: { duration: 15 },
                        studentExamId: params.studentExamId,
                        studentUsername: 'student1',
                    }
                }}
            />
        );
    }
    return <ExamInterface location={location} />;
}

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Navbar />
            
            <Routes>
                <Route path="/" element={
                    <div className="dashboard-container">
                        <div className="container">
                            <div className="welcome-section">
                                <div className="welcome-content">
                                    <h1 className="welcome-title">Online Exam System</h1>
                                    {user ? (
                                        <div>
                                            <p className="welcome-subtitle">Welcome back, {user.fullName || user.name || user.username}!</p>
                                            <p>Role: {user.role}</p>
                                            <div className="welcome-actions">
                                                {user.role === 'TEACHER' ? (
                                                    <>
                                                        <a href="/teacher/dashboard" className="welcome-btn">Go to Dashboard</a>
                                                        <a href="/create-exam" className="welcome-btn">Create New Exam</a>
                                                    </>
                                                ) : (
                                                    <>
                                                        <a href="/student/dashboard" className="welcome-btn">Go to Dashboard</a>
                                                        <a href="/student/exams" className="welcome-btn">View Exams</a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="welcome-subtitle">Please login to access the exam system.</p>
                                            <div className="welcome-actions">
                                                <a href="/login" className="welcome-btn">Login</a>
                                                <a href="/signup" className="welcome-btn">Sign Up</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                } />
                
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Teacher Routes */}
                <Route path="/teacher/dashboard" element={
                    <ProtectedRoute requiredRole="TEACHER">
                        <TeacherDashboard teacherUsername={user?.username || 'teacher1'} />
                    </ProtectedRoute>
                } />
                
                <Route path="/create-exam" element={
                    <ProtectedRoute requiredRole="TEACHER">
                        <ExamCreator />
                    </ProtectedRoute>
                } />

                <Route path="/edit-exam/:examId" element={
                    <ProtectedRoute requiredRole="TEACHER">
                        <ExamCreator />
                    </ProtectedRoute>
                } />
                
                <Route path="/question-bank" element={
                    <ProtectedRoute requiredRole="TEACHER">
                        <QuestionBank />
                    </ProtectedRoute>
                } />
                
                <Route path="/exam-results/:examId" element={
                    <ProtectedRoute requiredRole="TEACHER">
                        <TeacherExamResults />
                    </ProtectedRoute>
                } />
                
                <Route path="/all-results" element={
                    <ProtectedRoute requiredRole="TEACHER">
                        <AllResults />
                    </ProtectedRoute>
                } />
                
                <Route path="/exam-list/:filter" element={
                    <ProtectedRoute requiredRole="TEACHER">
                        <ExamList />
                    </ProtectedRoute>
                } />
                
                {/* Student Routes */}
                <Route path="/student/dashboard" element={
                    <ProtectedRoute requiredRole="STUDENT">
                        <StudentDashboard studentUsername={user?.username || 'student1'} />
                    </ProtectedRoute>
                } />
                
                <Route path="/student/exams" element={
                    <ProtectedRoute requiredRole="STUDENT">
                        <StudentExamList />
                    </ProtectedRoute>
                } />
                
                <Route path="/student/exams/:studentExamId" element={
                    <ProtectedRoute requiredRole="STUDENT">
                        <ExamInterfaceWrapper />
                    </ProtectedRoute>
                } />
                
                <Route path="/student/results" element={
                    <ProtectedRoute requiredRole="STUDENT">
                        <StudentResults />
                    </ProtectedRoute>
                } />
                
                <Route path="/student/results/:studentExamId" element={
                    <ProtectedRoute requiredRole="STUDENT">
                        <ExamResults />
                    </ProtectedRoute>
                } />

                {/* About and Contact pages */}
                <Route path="/about" element={
                    <div className="dashboard-container">
                        <div className="container">
                            <h1>About Us</h1>
                            <p>This is an online exam system for educational institutions.</p>
                        </div>
                    </div>
                } />

                <Route path="/contact" element={
                    <div className="dashboard-container">
                        <div className="container">
                            <h1>Contact Us</h1>
                            <p>Email: support@examsystem.com</p>
                            <p>Phone: +1-234-567-8900</p>
                        </div>
                    </div>
                } />
                
                <Route path="/help" element={<HelpSupport />} />
                
                <Route path="/profile" element={<Profile />} />
                
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;
