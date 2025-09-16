import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/forms.css';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
        setFormData({
            fullName: userData.fullName || userData.name || '',
            email: userData.email || '',
            username: userData.username || '',
            role: userData.role || '',
            phone: userData.phone || '',
            department: userData.department || '',
            bio: userData.bio || ''
        });
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
    };

    const getStats = () => {
        if (user.role === 'TEACHER') {
            return [
                { label: 'Exams Created', value: '12' },
                { label: 'Active Exams', value: '8' },
                { label: 'Total Students', value: '156' }
            ];
        } else {
            return [
                { label: 'Exams Taken', value: '24' },
                { label: 'Average Score', value: '85%' },
                { label: 'Completed', value: '20' }
            ];
        }
    };

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Header */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">My Profile</h1>
                        <p className="welcome-subtitle">Manage your account information and preferences</p>
                        <div className="welcome-actions">
                            <button 
                                className="welcome-btn"
                                onClick={() => navigate('/settings')}
                            >
                                ⚙️ Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                            color: 'white',
                            fontWeight: 'bold',
                            boxShadow: '0 12px 30px rgba(99, 102, 241, 0.4)'
                        }}>
                            {getInitials(user.fullName || user.name)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ color: '#f1f5f9', fontSize: '2rem', marginBottom: '0.5rem' }}>
                                {user.fullName || user.name || 'User'}
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                @{user.username}
                            </p>
                            <span style={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textTransform: 'capitalize'
                            }}>
                                {user.role?.toLowerCase()}
                            </span>
                        </div>
                        <button 
                            className="card-action"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? '✕ Cancel' : '✏️ Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    {getStats().map((stat, index) => (
                        <div key={index} className="stat-card">
                            <span className="stat-number">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Profile Information */}
                <div className="dashboard-card">
                    <h3 className="card-title">Profile Information</h3>
                    
                    {isEditing ? (
                        <div className="form-container">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Enter department"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    rows="4"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                            
                            <div className="form-actions">
                                <button className="btn btn-primary" onClick={handleSave}>
                                    💾 Save Changes
                                </button>
                                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' }}>Email</label>
                                    <p style={{ color: '#f1f5f9', fontSize: '1rem', margin: '0.5rem 0' }}>
                                        {user.email || 'Not provided'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' }}>Phone</label>
                                    <p style={{ color: '#f1f5f9', fontSize: '1rem', margin: '0.5rem 0' }}>
                                        {formData.phone || 'Not provided'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' }}>Department</label>
                                    <p style={{ color: '#f1f5f9', fontSize: '1rem', margin: '0.5rem 0' }}>
                                        {formData.department || 'Not provided'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' }}>Role</label>
                                    <p style={{ color: '#f1f5f9', fontSize: '1rem', margin: '0.5rem 0', textTransform: 'capitalize' }}>
                                        {user.role?.toLowerCase()}
                                    </p>
                                </div>
                            </div>
                            
                            {formData.bio && (
                                <div>
                                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' }}>Bio</label>
                                    <p style={{ color: '#f1f5f9', fontSize: '1rem', margin: '0.5rem 0', lineHeight: '1.6' }}>
                                        {formData.bio}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}