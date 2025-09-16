import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import '../styles/dashboard.css';
import '../styles/lists.css';

export default function ExamList() {
    const { filter } = useParams();
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchExams();
    }, [filter]);

    const fetchExams = async () => {
        try {
            setLoading(true);
            setError('');
            
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const teacherUsername = user.username;
            
            const res = await api.getExamsByTeacher(teacherUsername);
            let filteredExams = res.data || [];
            
            if (filter === 'active') {
                filteredExams = filteredExams.filter(exam => exam.isActive);
            } else if (filter === 'draft') {
                filteredExams = filteredExams.filter(exam => !exam.isActive);
            }
            
            setExams(filteredExams);
        } catch (e) {
            setError(e.message || 'Failed to load exams');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (examId, currentStatus) => {
        try {
            if (currentStatus) {
                await api.deactivateExam(examId);
            } else {
                await api.activateExam(examId);
            }
            await fetchExams();
        } catch (error) {
            alert('Failed to update exam status');
        }
    };

    const getPageTitle = () => {
        switch (filter) {
            case 'active': return 'Active Exams';
            case 'draft': return 'Draft Exams';
            default: return 'All Exams';
        }
    };

    const getPageDescription = () => {
        switch (filter) {
            case 'active': return 'Exams that are currently available for students';
            case 'draft': return 'Exams that are not yet published';
            default: return 'All your created exams';
        }
    };

    if (loading) return <div className="loading">Loading exams...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Header */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">{getPageTitle()}</h1>
                        <p className="welcome-subtitle">{getPageDescription()}</p>
                        <div className="welcome-actions">
                            <button 
                                className="welcome-btn"
                                onClick={() => navigate('/create-exam')}
                            >
                                + Create New Exam
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-number">{exams.length}</span>
                        <span className="stat-label">{filter === 'total' ? 'Total' : filter === 'active' ? 'Active' : 'Draft'} Exams</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{exams.filter(e => e.isActive).length}</span>
                        <span className="stat-label">Active</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{exams.filter(e => !e.isActive).length}</span>
                        <span className="stat-label">Draft</span>
                    </div>
                </div>

                {/* Exams List */}
                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">{getPageTitle()}</h2>
                        <span className="list-count">{exams.length} exams</span>
                    </div>

                    <div className="list-body">
                        {exams.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📝</div>
                                <h3 className="empty-title">No {filter === 'active' ? 'Active' : filter === 'draft' ? 'Draft' : ''} Exams Found</h3>
                                <p className="empty-description">
                                    {filter === 'active' 
                                        ? 'No active exams available. Activate some exams to make them available for students.'
                                        : filter === 'draft'
                                        ? 'No draft exams found. Create new exams or check if all exams are already active.'
                                        : 'No exams created yet. Get started by creating your first exam.'
                                    }
                                </p>
                                <button 
                                    className="empty-action"
                                    onClick={() => navigate('/create-exam')}
                                >
                                    Create New Exam
                                </button>
                            </div>
                        ) : (
                            exams.map((exam) => (
                                <div key={exam.examId} className="list-item">
                                    <div className="item-header">
                                        <h3 className="item-title">{exam.title}</h3>
                                        <div className="item-meta">
                                            <span className={`status-badge ${exam.isActive ? 'status-active' : 'status-inactive'}`}>
                                                {exam.isActive ? 'Active' : 'Draft'}
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
                                            <span className="stat-icon">📅</span>
                                            <span>Created {new Date(exam.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        <button 
                                            className="action-btn-small btn-view"
                                            onClick={() => navigate(`/exam-results/${exam.examId}`)}
                                        >
                                            📊 View Results
                                        </button>
                                        
                                        <button 
                                            className="action-btn-small btn-edit"
                                            onClick={() => navigate(`/edit-exam/${exam.examId}`)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        
                                        <button
                                            className={`action-btn-small ${exam.isActive ? 'btn-deactivate' : 'btn-activate'}`}
                                            onClick={() => handleToggleStatus(exam.examId, exam.isActive)}
                                        >
                                            {exam.isActive ? '⏸️ Deactivate' : '▶️ Activate'}
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