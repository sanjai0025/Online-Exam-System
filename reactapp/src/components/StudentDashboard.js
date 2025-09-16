import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import '../styles/dashboard.css';
import '../styles/lists.css';

function StudentDashboard({ studentUsername }) {
    const [availableExams, setAvailableExams] = useState([]);
    const [completedExams, setCompletedExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadStudentData();
    }, [studentUsername]);

    const loadStudentData = async () => {
        try {
            setLoading(true);
            const response = await api.getAvailableExams();
            setAvailableExams(response.data);
            
            // Load completed exams
            try {
                const completedResponse = await api.getCompletedExams(studentUsername);
                setCompletedExams(completedResponse.data);
            } catch (error) {
                console.log('No completed exams found');
                setCompletedExams([]);
            }
        } catch (error) {
            setError('Failed to load exams');
        } finally {
            setLoading(false);
        }
    };

    const handleStartExam = async (examId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const username = user.username || 'student';
            console.log('Frontend sending:', { examId, username });
            console.log('User from localStorage:', user);
            
            const response = await api.startExam(examId, username);
            navigate(`/student/exams/${response.data.studentExamId}`);
        } catch (error) {
            console.error('Frontend error:', error);
            console.error('Error response:', error.response?.data);
            setError('Failed to start exam');
        }
    };

    const handleViewResults = (studentExamId) => {
        navigate(`/student/results/${studentExamId}`);
    };

    const handleViewAllResults = () => {
        navigate('/student/results');
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Welcome Section */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">Welcome Back, {studentUsername}!</h1>
                        <p className="welcome-subtitle">Ready to take your exams and track your progress</p>
                        <div className="welcome-actions">
                            <button 
                                onClick={() => navigate('/student/exams')} 
                                style={{
                                    background: '#1e293b',
                                    color: 'white',
                                    border: '2px solid #334155',
                                    padding: '1rem 2rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#334155';
                                    e.target.style.borderColor = '#475569';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#1e293b';
                                    e.target.style.borderColor = '#334155';
                                }}
                            >
                                📚 View All Exams
                            </button>
                            <button 
                                onClick={handleViewAllResults} 
                                style={{
                                    background: '#0f172a',
                                    color: 'white',
                                    border: '2px solid #1e293b',
                                    padding: '1rem 2rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#1e293b';
                                    e.target.style.borderColor = '#334155';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#0f172a';
                                    e.target.style.borderColor = '#1e293b';
                                }}
                            >
                                📊 My Results
                            </button>
                        </div>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-number">{availableExams.length}</span>
                        <span className="stat-label">Available Exams</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{completedExams.length}</span>
                        <span className="stat-label">Completed Exams</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">
                            {completedExams.length > 0 
                                ? Math.round(completedExams.reduce((sum, exam) => sum + (exam.percentage || 0), 0) / completedExams.length)
                                : 0}%
                        </span>
                        <span className="stat-label">Average Score</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <div className="card-icon">📝</div>
                        <h3 className="card-title">Take Exams</h3>
                        <p className="card-description">
                            Browse and take available exams assigned by your teachers.
                        </p>
                        <button 
                            onClick={() => navigate('/student/exams')}
                            style={{
                                background: '#1e293b',
                                color: 'white',
                                border: '1px solid #334155',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                width: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#334155';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = '#1e293b';
                            }}
                        >
                            Browse Exams
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">📊</div>
                        <h3 className="card-title">View Results</h3>
                        <p className="card-description">
                            Check your exam scores and detailed performance analytics.
                        </p>
                        <button 
                            onClick={handleViewAllResults}
                            style={{
                                background: '#1e293b',
                                color: 'white',
                                border: '1px solid #334155',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                width: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#334155';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = '#1e293b';
                            }}
                        >
                            View Results
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">👤</div>
                        <h3 className="card-title">My Profile</h3>
                        <p className="card-description">
                            Update your profile information and account settings.
                        </p>
                        <button 
                            onClick={() => navigate('/profile')}
                            style={{
                                background: '#1e293b',
                                color: 'white',
                                border: '1px solid #334155',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                width: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#334155';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = '#1e293b';
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Available Exams */}
                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">Available Exams</h2>
                        <span className="list-count">{availableExams.length} exams</span>
                    </div>
                    <div className="list-body">
                        {availableExams.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📚</div>
                                <h3 className="empty-title">No Exams Available</h3>
                                <p className="empty-description">
                                    No exams are currently available. Check back later or contact your teacher.
                                </p>
                            </div>
                        ) : (
                            availableExams.slice(0, 3).map(exam => (
                                <div key={exam.examId} className="list-item">
                                    <div className="item-header">
                                        <h3 className="item-title">{exam.title}</h3>
                                        <div className="item-meta">
                                            <span className="status-badge status-active">
                                                Available
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="item-description">{exam.description}</p>
                                    
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-icon">⏱️</span>
                                            <span>{exam.duration} minutes</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">❓</span>
                                            <span>{exam.questions?.length || 0} questions</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">👨‍🏫</span>
                                            <span>By {exam.createdBy}</span>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        <button 
                                            className="action-btn-small btn-activate"
                                            onClick={() => handleStartExam(exam.examId)}
                                        >
                                            🚀 Start Exam
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                        {availableExams.length > 3 && (
                            <div className="list-item" style={{ textAlign: 'center', padding: '2rem' }}>
                                <button 
                                    onClick={() => navigate('/student/exams')}
                                    style={{
                                        background: '#0f172a',
                                        color: 'white',
                                        border: '1px solid #1e293b',
                                        padding: '1rem 2rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#1e293b';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#0f172a';
                                    }}
                                >
                                    View All {availableExams.length} Exams
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Results */}
                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">Recent Results</h2>
                        <span className="list-count">{completedExams.length} completed</span>
                    </div>
                    <div className="list-body">
                        {completedExams.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📊</div>
                                <h3 className="empty-title">No Results Yet</h3>
                                <p className="empty-description">
                                    Complete some exams to see your results and performance analytics here.
                                </p>
                                <button 
                                    onClick={() => navigate('/student/exams')}
                                    style={{
                                        background: '#1e293b',
                                        color: 'white',
                                        border: '1px solid #334155',
                                        padding: '1rem 2rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#334155';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#1e293b';
                                    }}
                                >
                                    Take Your First Exam
                                </button>
                            </div>
                        ) : (
                            completedExams.slice(0, 5).map(result => (
                                <div key={result.studentExamId} className="list-item">
                                    <div className="item-header">
                                        <h3 className="item-title">{result.examTitle}</h3>
                                        <div className="item-meta">
                                            <span className={`status-badge ${
                                                (result.percentage || 0) >= 80 ? 'status-completed' :
                                                (result.percentage || 0) >= 60 ? 'status-active' : 'status-inactive'
                                            }`}>
                                                {result.percentage || 0}%
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-icon">🎯</span>
                                            <span>{result.score} points</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">📅</span>
                                            <span>Completed {new Date(result.completedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        <button 
                                            className="action-btn-small btn-view"
                                            onClick={() => handleViewResults(result.studentExamId)}
                                        >
                                            📋 View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                        {completedExams.length > 5 && (
                            <div className="list-item" style={{ textAlign: 'center', padding: '2rem' }}>
                                <button 
                                    onClick={handleViewAllResults}
                                    style={{
                                        background: '#0f172a',
                                        color: 'white',
                                        border: '1px solid #1e293b',
                                        padding: '1rem 2rem',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#1e293b';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#0f172a';
                                    }}
                                >
                                    View All Results
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;