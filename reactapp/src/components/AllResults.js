import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import '../styles/dashboard.css';

export default function AllResults() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [exams, setExams] = useState([]);
    const [allResults, setAllResults] = useState([]);

    useEffect(() => {
        const fetchAllResults = async () => {
            try {
                setLoading(true);
                setError('');
                
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const teacherUsername = user.username;
                
                // Get all exams by teacher
                const examsRes = await api.getExamsByTeacher(teacherUsername);
                const examList = examsRes.data || [];
                setExams(examList);
                
                // Get results for each exam
                const resultsPromises = examList.map(async (exam) => {
                    try {
                        const resultsRes = await api.getTeacherExamResults(exam.examId);
                        return {
                            exam,
                            results: resultsRes.data || []
                        };
                    } catch (e) {
                        return { exam, results: [] };
                    }
                });
                
                const examResults = await Promise.all(resultsPromises);
                setAllResults(examResults);
                
            } catch (e) {
                setError(e.message || 'Failed to load results');
            } finally {
                setLoading(false);
            }
        };
        
        fetchAllResults();
    }, []);

    const getTotalStats = () => {
        let totalStudents = 0;
        let totalCompleted = 0;
        let totalScore = 0;
        let scoreCount = 0;
        
        allResults.forEach(({ results }) => {
            totalStudents += results.length;
            results.forEach(result => {
                if (result.status === 'COMPLETED') {
                    totalCompleted++;
                    totalScore += result.score || 0;
                    scoreCount++;
                }
            });
        });
        
        const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;
        return { totalStudents, totalCompleted, avgScore, totalExams: exams.length };
    };

    if (loading) return <div className="loading">Loading all results...</div>;
    if (error) return <div className="error-message">{error}</div>;

    const stats = getTotalStats();

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Header */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">All Exam Results</h1>
                        <p className="welcome-subtitle">Overview of all student performance across your exams</p>
                        <div className="welcome-actions">
                        </div>
                    </div>
                </div>

                {/* Overall Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-number">{stats.totalExams}</span>
                        <span className="stat-label">Total Exams</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.totalStudents}</span>
                        <span className="stat-label">Total Attempts</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.totalCompleted}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{stats.avgScore}</span>
                        <span className="stat-label">Average Score</span>
                    </div>
                </div>

                {/* Results by Exam */}
                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">Results by Exam</h2>
                        <span className="list-count">{exams.length} exams</span>
                    </div>

                    <div className="list-body">
                        {allResults.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📊</div>
                                <h3 className="empty-title">No Results Available</h3>
                                <p className="empty-description">
                                    No exam results found. Students need to take your exams first.
                                </p>
                            </div>
                        ) : (
                            allResults.map(({ exam, results }) => (
                                <div key={exam.examId} className="list-item">
                                    <div className="item-header">
                                        <h3 className="item-title">{exam.title}</h3>
                                        <div className="item-meta">
                                            <span className="status-badge status-active">
                                                {results.length} attempts
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="item-description">{exam.description}</p>
                                    
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-icon">👥</span>
                                            <span>{results.length} students</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">✅</span>
                                            <span>{results.filter(r => r.status === 'COMPLETED').length} completed</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">🎯</span>
                                            <span>Avg: {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length) : 0}</span>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        <button 
                                            className="action-btn-small btn-view"
                                            onClick={() => navigate(`/exam-results/${exam.examId}`)}
                                        >
                                            📊 View Details
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