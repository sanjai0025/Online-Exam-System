import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';

function QuestionBank() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            setLoading(true);
            const response = await api.getAllQuestions();
            setQuestions(response.data);
        } catch (error) {
            setError('Failed to load questions');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading questions...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Question Bank</h1>
                    <p>All questions from your exams</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">All Questions</h2>
                        <span className="list-count">{questions.length} questions</span>
                    </div>

                    <div className="list-body">
                        {questions.length === 0 ? (
                            <div className="empty-state">
                                <p>No questions found.</p>
                                <button onClick={() => navigate('/create-exam')} className="btn btn-primary">
                                    Create Your First Exam
                                </button>
                            </div>
                        ) : (
                            questions.map((question, index) => (
                                <div key={question.questionId} className="list-item">
                                    <div className="item-header">
                                        <h3 className="item-title">Question {index + 1}</h3>
                                        <div className="item-meta">
                                            <span className="status-badge status-active">
                                                {question.marks} marks
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="item-description">{question.questionText}</p>
                                    
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-icon">A.</span>
                                            <span className={question.correctOption === 'A' ? 'correct-answer' : ''}>
                                                {question.optionA}
                                            </span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">B.</span>
                                            <span className={question.correctOption === 'B' ? 'correct-answer' : ''}>
                                                {question.optionB}
                                            </span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">C.</span>
                                            <span className={question.correctOption === 'C' ? 'correct-answer' : ''}>
                                                {question.optionC}
                                            </span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-icon">D.</span>
                                            <span className={question.correctOption === 'D' ? 'correct-answer' : ''}>
                                                {question.optionD}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="item-actions">
                                        <div className="action-btn-small" style={{ 
                                            background: '#c6f6d5',
                                            color: '#22543d',
                                            border: '1px solid #9ae6b4'
                                        }}>
                                            ✅ Correct Answer: {question.correctOption}
                                        </div>
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

export default QuestionBank;