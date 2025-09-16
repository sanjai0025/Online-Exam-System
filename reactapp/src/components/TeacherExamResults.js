import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import '../styles/dashboard.css';

export default function TeacherExamResults() {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);
    const [exam, setExam] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                setError('');
                
                // Fetch exam details and results
                const [examRes, resultsRes] = await Promise.all([
                    api.getExamById(examId),
                    api.getTeacherExamResults(examId)
                ]);
                
                setExam(examRes.data);
                setResults(resultsRes.data);
            } catch (e) {
                setError(e.message || 'Failed to load results');
            } finally {
                setLoading(false);
            }
        };
        
        if (examId) fetchResults();
    }, [examId]);

    const getStats = () => {
        const total = results.length;
        const completed = results.filter(r => r.status === 'COMPLETED').length;
        const inProgress = results.filter(r => r.status === 'IN_PROGRESS').length;
        const avgScore = total > 0 ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / total) : 0;
        
        return { total, completed, inProgress, avgScore };
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return 'Not completed';
        return new Date(dateTime).toLocaleString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return '#22543d';
            case 'IN_PROGRESS': return '#ed8936';
            default: return '#718096';
        }
    };

    if (loading) return <div className="loading">Loading results...</div>;
    if (error) return <div className="error-message">{error}</div>;

    const stats = getStats();

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Header */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">Exam Results</h1>
                        <h2 className="welcome-subtitle">{exam?.title}</h2>
                        <p>{exam?.description}</p>
                        <div className="welcome-actions">
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-number">{stats.total}</span>
                        <span className="stat-label">Total Students</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.completed}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.inProgress}</span>
                        <span className="stat-label">In Progress</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.avgScore}</span>
                        <span className="stat-label">Average Score</span>
                    </div>
                </div>

                {/* Results List */}
                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">Student Results</h2>
                        <span className="list-count">{results.length} students</span>
                    </div>

                    <div className="list-body">
                        {results.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📊</div>
                                <h3 className="empty-title">No Results Yet</h3>
                                <p className="empty-description">
                                    No students have taken this exam yet. Results will appear here once students complete the exam.
                                </p>
                            </div>
                        ) : (
                            results.map((result) => (
                                <div key={result.studentExamId} className="list-item">
                                    <div className="item-header">
                                        <h3 className="item-title">{result.studentUsername}</h3>
                                        <div className="item-meta">
                                            <span 
                                                className="status-badge"
                                                style={{ 
                                                    backgroundColor: getStatusColor(result.status) + '20',
                                                    color: getStatusColor(result.status),
                                                    border: `1px solid ${getStatusColor(result.status)}40`
                                                }}
                                            >
                                                {result.status}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-icon">🎯</span>
                                            <span>Score: {result.score || 0}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">🕐</span>
                                            <span>Started: {formatDateTime(result.startTime)}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">✅</span>
                                            <span>Completed: {formatDateTime(result.endTime)}</span>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        {result.status === 'COMPLETED' && (
                                            <button 
                                                className="action-btn-small btn-view"
                                                onClick={() => navigate(`/exam-results/${result.studentExamId}`)}
                                            >
                                                📋 View Details
                                            </button>
                                        )}
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