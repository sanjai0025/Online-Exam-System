import React, { useState } from 'react';
import '../styles/dashboard.css';
import '../styles/lists.css';

export default function HelpSupport() {
    const [activeTab, setActiveTab] = useState('faq');
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: "How do I create a new exam?",
            answer: "Go to your teacher dashboard and click 'Create New Exam'. Fill in the exam details, add questions with multiple choice options, and activate when ready."
        },
        {
            question: "How do students take exams?",
            answer: "Students log in, go to their dashboard, select an available exam, and click 'Start Exam'. They can navigate between questions and submit when finished."
        },
        {
            question: "Can I edit an exam after creating it?",
            answer: "Yes, you can edit exams from your dashboard. Click the 'Edit' button next to any exam. Note that editing active exams may affect students currently taking them."
        },
        {
            question: "How do I view exam results?",
            answer: "Click 'View Results' on any exam from your dashboard to see all student submissions, scores, and detailed performance analytics."
        },
        {
            question: "What happens if a student's session times out?",
            answer: "The system automatically saves answers as students select them. If a session times out, their progress is preserved and they can resume or submit."
        },
        {
            question: "How do I activate or deactivate an exam?",
            answer: "From your dashboard, use the 'Activate' or 'Deactivate' button next to each exam. Only active exams are visible to students."
        }
    ];

    const guides = [
        {
            title: "Getting Started as a Teacher",
            steps: [
                "Sign up with your teacher credentials",
                "Complete your profile setup",
                "Create your first exam with questions",
                "Activate the exam for students",
                "Monitor results and student progress"
            ]
        },
        {
            title: "Getting Started as a Student",
            steps: [
                "Sign up with your student credentials",
                "Browse available exams on your dashboard",
                "Click 'Start Exam' when ready",
                "Answer questions within the time limit",
                "Submit and view your results"
            ]
        },
        {
            title: "Managing Exams",
            steps: [
                "Create exams with detailed questions",
                "Set appropriate time limits",
                "Use the question bank for reusable questions",
                "Activate exams when ready for students",
                "Review and analyze student performance"
            ]
        }
    ];

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Header */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">Help & Support</h1>
                        <p className="welcome-subtitle">Find answers to common questions and get help using the exam system</p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                    <div 
                        className={`stat-card ${activeTab === 'faq' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('faq')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="stat-number">❓</span>
                        <span className="stat-label">FAQ</span>
                    </div>
                    <div 
                        className={`stat-card ${activeTab === 'guides' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('guides')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="stat-number">📚</span>
                        <span className="stat-label">User Guides</span>
                    </div>
                    <div 
                        className={`stat-card ${activeTab === 'contact' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('contact')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="stat-number">📞</span>
                        <span className="stat-label">Contact Us</span>
                    </div>
                </div>

                {/* FAQ Section */}
                {activeTab === 'faq' && (
                    <div className="list-container">
                        <div className="list-header">
                            <h2 className="list-title">Frequently Asked Questions</h2>
                            <span className="list-count">{faqs.length} questions</span>
                        </div>
                        <div className="list-body">
                            {faqs.map((faq, index) => (
                                <div key={index} className="list-item">
                                    <div 
                                        className="item-header"
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <h3 className="item-title">{faq.question}</h3>
                                        <div className="item-meta">
                                            <span className="status-badge status-active">
                                                {openFaq === index ? '−' : '+'}
                                            </span>
                                        </div>
                                    </div>
                                    {openFaq === index && (
                                        <div className="item-description" style={{ marginTop: '1rem' }}>
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* User Guides Section */}
                {activeTab === 'guides' && (
                    <div className="dashboard-cards">
                        {guides.map((guide, index) => (
                            <div key={index} className="dashboard-card">
                                <div className="card-icon">📖</div>
                                <h3 className="card-title">{guide.title}</h3>
                                <div className="card-description">
                                    <ol style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                                        {guide.steps.map((step, stepIndex) => (
                                            <li key={stepIndex} style={{ marginBottom: '0.5rem' }}>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Contact Section */}
                {activeTab === 'contact' && (
                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <div className="card-icon">📧</div>
                            <h3 className="card-title">Email Support</h3>
                            <p className="card-description">
                                Get help via email for technical issues or account problems.
                            </p>
                            <div className="card-action" style={{ background: '#06b6d4' }}>
                                support@examsystem.com
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="card-icon">💬</div>
                            <h3 className="card-title">Live Chat</h3>
                            <p className="card-description">
                                Chat with our support team for immediate assistance.
                            </p>
                            <button className="card-action">
                                Start Live Chat
                            </button>
                        </div>

                        <div className="dashboard-card">
                            <div className="card-icon">📱</div>
                            <h3 className="card-title">Phone Support</h3>
                            <p className="card-description">
                                Call us during business hours for urgent support needs.
                            </p>
                            <div className="card-action" style={{ background: '#10b981' }}>
                                +1-234-567-8900
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Help Section */}
                <div className="list-container">
                    <div className="list-header">
                        <h2 className="list-title">Quick Help</h2>
                    </div>
                    <div className="list-body">
                        <div className="list-item">
                            <div className="item-header">
                                <h3 className="item-title">System Requirements</h3>
                            </div>
                            <div className="item-description">
                                Modern web browser (Chrome, Firefox, Safari, Edge), stable internet connection, JavaScript enabled.
                            </div>
                        </div>
                        
                        <div className="list-item">
                            <div className="item-header">
                                <h3 className="item-title">Browser Compatibility</h3>
                            </div>
                            <div className="item-description">
                                Best experience on Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. Mobile browsers supported.
                            </div>
                        </div>
                        
                        <div className="list-item">
                            <div className="item-header">
                                <h3 className="item-title">Data Privacy</h3>
                            </div>
                            <div className="item-description">
                                Your data is encrypted and secure. We follow strict privacy policies and never share personal information.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .active-tab {
                    border: 2px solid #6366f1 !important;
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
                }
                
                .active-tab .stat-number {
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    );
}