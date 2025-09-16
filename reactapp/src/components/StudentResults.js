import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import '../styles/dashboard.css';
import '../styles/lists.css';

export default function StudentResults() {
    const navigate = useNavigate();
    const [completedExams, setCompletedExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCompletedExams();
    }, []);

    const loadCompletedExams = async () => {
        try {
            setLoading(true);
            setError('');
            
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const studentUsername = user.username;
            
            const response = await api.getCompletedExams(studentUsername);
            setCompletedExams(response.data || []);
        } catch (e) {
            setError('Failed to load results');
            setCompletedExams([]);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (studentExamId) => {
        navigate(`/student/results/${studentExamId}`);
    };

    const getStats = () => {
        const total = completedExams.length;
        const avgScore = total > 0 
            ? Math.round(completedExams.reduce((sum, exam) => sum + (exam.percentage || 0), 0) / total)
            : 0;
        const passed = completedExams.filter(exam => (exam.percentage || 0) >= 60).length;
        
        return { total, avgScore, passed };
    };

    if (loading) return <div className="loading">Loading results...</div>;

    const stats = getStats();

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/student/dashboard')}
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '2rem',
                        background: 'rgba(30, 41, 59, 0.9)',
                        color: 'white',
                        border: '1px solid #334155',
                        padding: '0.8rem 1.2rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        zIndex: 10,
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(51, 65, 85, 0.9)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(30, 41, 59, 0.9)';
                    }}
                >
                    ← Back to Dashboard
                </button>

                {/* Header */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">My Results</h1>
                        <p className="welcome-subtitle">View your exam performance and detailed analytics</p>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-number">{stats.total}</span>
                        <span className="stat-label">Exams Completed</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.avgScore}%</span>
                        <span className="stat-label">Average Score</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.passed}</span>
                        <span className="stat-label">Passed Exams</span>
                    </div>
                </div>

                {/* Results List */}
                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">Exam Results</h2>
                        <span className="list-count">{completedExams.length} results</span>
                    </div>

                    <div className="list-body">
                        {completedExams.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📊</div>
                                <h3 className="empty-title">No Results Yet</h3>
                                <p className="empty-description">
                                    You haven't completed any exams yet. Take some exams to see your results here.
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
                                    Browse Available Exams
                                </button>
                            </div>
                        ) : (
                            completedExams.map((result) => (
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
                                        <div className="stat-item">
                                            <span className="stat-icon">⏱️</span>
                                            <span>Duration: {result.duration || 'N/A'} minutes</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">📝</span>
                                            <span>Grade: {
                                                (result.percentage || 0) >= 90 ? 'A+' :
                                                (result.percentage || 0) >= 80 ? 'A' :
                                                (result.percentage || 0) >= 70 ? 'B+' :
                                                (result.percentage || 0) >= 60 ? 'B' :
                                                (result.percentage || 0) >= 50 ? 'C' : 'F'
                                            }</span>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        <button 
                                            className="action-btn-small btn-view"
                                            onClick={() => handleViewDetails(result.studentExamId)}
                                        >
                                            📋 View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}