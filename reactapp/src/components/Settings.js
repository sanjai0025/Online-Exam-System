import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/forms.css';

export default function Settings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            examReminders: true,
            resultNotifications: true,
            systemUpdates: false
        },
        privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false
        },
        preferences: {
            theme: 'dark',
            language: 'english',
            timezone: 'UTC',
            autoSave: true
        }
    });
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleSettingChange = (category, setting, value) => {
        const newSettings = {
            ...settings,
            [category]: {
                ...settings[category],
                [setting]: value
            }
        };
        setSettings(newSettings);
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        alert('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Header */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1 className="welcome-title">Settings</h1>
                        <p className="welcome-subtitle">Manage your account preferences and security settings</p>
                        <div className="welcome-actions">
                            <button 
                                className="welcome-btn"
                                onClick={() => navigate('/profile')}
                            >
                                👤 Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Tabs */}
                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                    <div 
                        className={`stat-card ${activeTab === 'account' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('account')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="stat-number">🔐</span>
                        <span className="stat-label">Account</span>
                    </div>
                    <div 
                        className={`stat-card ${activeTab === 'notifications' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="stat-number">🔔</span>
                        <span className="stat-label">Notifications</span>
                    </div>
                    <div 
                        className={`stat-card ${activeTab === 'privacy' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('privacy')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="stat-number">🛡️</span>
                        <span className="stat-label">Privacy</span>
                    </div>
                    <div 
                        className={`stat-card ${activeTab === 'preferences' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="stat-number">⚙️</span>
                        <span className="stat-label">Preferences</span>
                    </div>
                </div>

                {/* Account Settings */}
                {activeTab === 'account' && (
                    <div className="dashboard-card">
                        <h3 className="card-title">Account Security</h3>
                        <form onSubmit={handlePasswordSubmit} className="form-container">
                            <div className="form-group">
                                <label className="form-label">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    🔒 Update Password
                                </button>
                            </div>
                        </form>
                        
                        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <h4 style={{ color: '#ef4444', marginBottom: '1rem' }}>Danger Zone</h4>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <button 
                                className="btn"
                                style={{ background: '#ef4444', color: 'white' }}
                                onClick={handleDeleteAccount}
                            >
                                🗑️ Delete Account
                            </button>
                        </div>
                    </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                    <div className="dashboard-card">
                        <h3 className="card-title">Notification Preferences</h3>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {Object.entries(settings.notifications).map(([key, value]) => (
                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                                    <div>
                                        <h4 style={{ color: '#f1f5f9', margin: '0 0 0.5rem 0', textTransform: 'capitalize' }}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
                                            {key === 'email' && 'Receive email notifications'}
                                            {key === 'examReminders' && 'Get reminders about upcoming exams'}
                                            {key === 'resultNotifications' && 'Notifications when results are available'}
                                            {key === 'systemUpdates' && 'Updates about system maintenance'}
                                        </p>
                                    </div>
                                    <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                                            style={{ opacity: 0, width: 0, height: 0 }}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            cursor: 'pointer',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: value ? '#6366f1' : '#64748b',
                                            transition: '0.4s',
                                            borderRadius: '34px'
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                content: '',
                                                height: '26px',
                                                width: '26px',
                                                left: value ? '30px' : '4px',
                                                bottom: '4px',
                                                background: 'white',
                                                transition: '0.4s',
                                                borderRadius: '50%'
                                            }} />
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                    <div className="dashboard-card">
                        <h3 className="card-title">Privacy Settings</h3>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label className="form-label">Profile Visibility</label>
                                <select
                                    value={settings.privacy.profileVisibility}
                                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="friends">Friends Only</option>
                                </select>
                            </div>
                            
                            {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                                    <div>
                                        <h4 style={{ color: '#f1f5f9', margin: '0 0 0.5rem 0', textTransform: 'capitalize' }}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
                                            {key === 'showEmail' && 'Display email address on profile'}
                                            {key === 'showPhone' && 'Display phone number on profile'}
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                                        style={{ transform: 'scale(1.5)' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Preferences */}
                {activeTab === 'preferences' && (
                    <div className="dashboard-card">
                        <h3 className="card-title">Application Preferences</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Theme</label>
                                <select
                                    value={settings.preferences.theme}
                                    onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="dark">Dark</option>
                                    <option value="light">Light</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Language</label>
                                <select
                                    value={settings.preferences.language}
                                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Timezone</label>
                                <select
                                    value={settings.preferences.timezone}
                                    onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="UTC">UTC</option>
                                    <option value="EST">Eastern Time</option>
                                    <option value="PST">Pacific Time</option>
                                    <option value="GMT">GMT</option>
                                </select>
                            </div>
                        </div>
                        
                        <div style={{ marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                                <div>
                                    <h4 style={{ color: '#f1f5f9', margin: '0 0 0.5rem 0' }}>Auto Save</h4>
                                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
                                        Automatically save your progress while taking exams
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.preferences.autoSave}
                                    onChange={(e) => handleSettingChange('preferences', 'autoSave', e.target.checked)}
                                    style={{ transform: 'scale(1.5)' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
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