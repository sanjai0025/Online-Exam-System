import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import '../styles/exam.css';

export default function ExamInterface(props) {
    const locationState = props.location?.state ?? {};
    const { questions = [], exam = {}, studentExamId = '' } = locationState;
    const { studentExamId: idFromUrl } = useParams();
    const sid = studentExamId || idFromUrl || '';
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState((exam.duration || 15) * 60); // in seconds
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    
    const current = questions[index] || {};

    // Timer effect
    useEffect(() => {
        if (timeLeft <= 0) {
            handleAutoSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Auto-save answers
    useEffect(() => {
        const autoSave = setTimeout(() => {
            if (answers[current.questionId] && current.questionId) {
                saveAnswer(current.questionId, answers[current.questionId]);
            }
        }, 30000); // Auto-save every 30 seconds

        return () => clearTimeout(autoSave);
    }, [answers, current.questionId]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerClass = () => {
        if (timeLeft <= 300) return 'timer-critical'; // 5 minutes
        if (timeLeft <= 900) return 'timer-warning'; // 15 minutes
        return '';
    };

    const selectOption = async (opt) => {
        setAnswers((prev) => ({ ...prev, [current.questionId]: opt }));
        // Save answer immediately when selected
        try {
            await saveAnswer(current.questionId, opt);
        } catch (err) {
            console.error('Failed to save answer immediately:', err);
        }
    };

    const saveAnswer = async (questionId, selectedOption) => {
        if (!sid || !questionId || !selectedOption) {
            console.error('Missing required data for saving answer:', { sid, questionId, selectedOption });
            return;
        }
        
        try {
            console.log('Saving answer:', { studentExamId: sid, questionId, selectedOption });
            await api.submitAnswer(sid, questionId, selectedOption);
            console.log('Answer saved successfully');
            showAutoSaveIndicator();
        } catch (err) {
            console.error('Failed to save answer:', err);
            // Don't show alert for every save failure, just log it
            console.error('Answer save failed, will retry on next action');
        }
    };

    const showAutoSaveIndicator = () => {
        const indicator = document.querySelector('.auto-save-indicator');
        if (indicator) {
            indicator.classList.add('show');
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 2000);
        }
    };

    const next = async () => {
        // Save current answer before moving to next
        if (answers[current.questionId]) {
            try {
                await saveAnswer(current.questionId, answers[current.questionId]);
            } catch (err) {
                console.error('Failed to save answer on next:', err);
            }
        }
        if (index < questions.length - 1) {
            setIndex((i) => i + 1);
        }
    };

    const prev = () => {
        if (index > 0) setIndex((i) => i - 1);
    };

    const goToQuestion = (questionIndex) => {
        setIndex(questionIndex);
    };

    const handleAutoSubmit = async () => {
        setIsSubmitting(true);
        try {
            await api.completeExam(sid);
            navigate(`/student/results/${sid}`);
        } catch (err) {
            console.error('Auto-submit failed:', err);
        }
    };

    const handleSubmitExam = () => {
        setShowSubmitModal(true);
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Save current answer if any
            if (answers[current.questionId]) {
                await saveAnswer(current.questionId, answers[current.questionId]);
            }
            
            console.log('Completing exam with studentExamId:', sid);
            const response = await api.completeExam(sid);
            console.log('Exam completed:', response);
            navigate(`/student/results/${sid}`);
        } catch (err) {
            console.error('Submit failed:', err);
            alert('Failed to submit exam. Please try again.');
            setIsSubmitting(false);
            setShowSubmitModal(false);
        }
    };

    const getAnsweredCount = () => {
        return Object.keys(answers).length;
    };

    const getProgressPercentage = () => {
        return (getAnsweredCount() / questions.length) * 100;
    };

    if (!current.questionText) {
        return (
            <div className="exam-container">
                <div className="loading">No questions available</div>
            </div>
        );
    }

    return (
        <div className="exam-container">
            {/* Auto-save indicator */}
            <div className="auto-save-indicator">
                Answer saved automatically
            </div>

            {/* Exam Header */}
            <div className="exam-header">
                <div className="exam-info">
                    <h2>{exam.title || 'Exam'}</h2>
                    <div className="exam-meta">
                        <div className="meta-item">
                            <span>📝</span>
                            <span>Question {index + 1} of {questions.length}</span>
                        </div>
                        <div className="meta-item">
                            <span>✅</span>
                            <span>{getAnsweredCount()} answered</span>
                        </div>
                    </div>
                </div>
                
                <div className={`exam-timer ${getTimerClass()}`}>
                    <div className="timer-label">Time Remaining</div>
                    <div className="timer-display">{formatTime(timeLeft)}</div>
                </div>
            </div>

            <div className="exam-content">
                {/* Question Panel */}
                <div className="question-panel">
                    <div className="question-header">
                        <div className="question-number">Question {index + 1}</div>
                        <div className="question-text">{current.questionText}</div>
                    </div>

                    <div className="question-body">
                        <div className="answer-options">
                            {['A', 'B', 'C', 'D'].map(option => (
                                <label 
                                    key={option}
                                    className={`answer-option ${answers[current.questionId] === option ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${current.questionId}`}
                                        value={option}
                                        checked={answers[current.questionId] === option}
                                        onChange={() => selectOption(option)}
                                    />
                                    <div className="answer-text">
                                        {current[`option${option}`]}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="exam-controls">
                        <div className="control-group">
                            <button 
                                className="control-btn btn-nav" 
                                onClick={prev}
                                disabled={index === 0}
                            >
                                ← Previous
                            </button>
                            <button 
                                className="control-btn btn-nav" 
                                onClick={next}
                                disabled={index === questions.length - 1}
                            >
                                Next →
                            </button>
                        </div>

                        <button 
                            onClick={handleSubmitExam}
                            disabled={isSubmitting}
                            style={{
                                background: isSubmitting 
                                    ? 'rgba(239, 68, 68, 0.5)' 
                                    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                                    e.target.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.6)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                                }
                            }}
                        >
                            {isSubmitting ? '⏳ Submitting...' : '📤 Submit Exam'}
                        </button>
                    </div>
                </div>

                {/* Question Navigation Sidebar */}
                <div className="question-nav">
                    <h3 className="nav-title">Question Navigator</h3>
                    
                    {/* Progress */}
                    <div className="exam-progress">
                        <div className="progress-info">
                            <span>Progress</span>
                            <span>{Math.round(getProgressPercentage())}%</span>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question Palette */}
                    <div className="question-palette">
                        {questions.map((_, i) => (
                            <button
                                key={i}
                                className={`palette-item ${i === index ? 'current' : ''} ${answers[questions[i].questionId] ? 'answered' : ''}`}
                                onClick={() => goToQuestion(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="palette-legend">
                        <div className="legend-item">
                            <div className="legend-color legend-current"></div>
                            <span>Current</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color legend-answered"></div>
                            <span>Answered</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color legend-unanswered"></div>
                            <span>Not Answered</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(8px)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                        borderRadius: '20px',
                        padding: '3rem',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        textAlign: 'center',
                        animation: 'modalSlideIn 0.3s ease-out'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            fontSize: '2.5rem'
                        }}>
                            📝
                        </div>
                        
                        <h3 style={{
                            color: '#ffffff',
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                        }}>Submit Exam?</h3>
                        
                        <p style={{
                            color: '#cbd5e1',
                            fontSize: '1.1rem',
                            lineHeight: '1.6',
                            marginBottom: '2.5rem',
                            opacity: '0.9'
                        }}>
                            You have answered <strong style={{ color: '#ffffff' }}>{getAnsweredCount()}</strong> out of <strong style={{ color: '#ffffff' }}>{questions.length}</strong> questions.
                            <br />Are you sure you want to submit your exam?
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center'
                        }}>
                            <button 
                                onClick={() => setShowSubmitModal(false)}
                                style={{
                                    background: 'rgba(148, 163, 184, 0.2)',
                                    color: '#cbd5e1',
                                    border: '1px solid rgba(148, 163, 184, 0.3)',
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    minWidth: '120px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(148, 163, 184, 0.3)';
                                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(148, 163, 184, 0.2)';
                                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmSubmit}
                                disabled={isSubmitting}
                                style={{
                                    background: isSubmitting 
                                        ? 'rgba(99, 102, 241, 0.5)' 
                                        : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    minWidth: '120px',
                                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.transform = 'translateY(-2px) scale(1.05)';
                                        e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.6)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.transform = 'translateY(0) scale(1)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
                                    }
                                }}
                            >
                                {isSubmitting ? '⏳ Submitting...' : '✅ Yes, Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}

