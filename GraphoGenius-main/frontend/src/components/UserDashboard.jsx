// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard.css';

// const UserDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userType = localStorage.getItem('userType');
    
//     if (!token || userType !== 'user') {
//       navigate('/user-login');
//       return;
//     }

//     fetchUserProfile();
//   }, [navigate]);

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/user/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         handleLogout();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/user/logout', {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('userType');
//       navigate('/');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="dashboard-loading">
//         <div className="spinner-large"></div>
//         <p>Loading your dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <div className="header-content">
//           <h1>User Dashboard</h1>
//           <div className="header-actions">
//             <span className="user-welcome">Welcome, {user?.name}</span>
//             <button onClick={handleLogout} className="logout-btn">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="dashboard-content">
//         <div className="dashboard-grid">
//           {/* Profile Card */}
//           <div className="dashboard-card profile-card">
//             <div className="card-header">
//               <h3>👤 Profile Information</h3>
//             </div>
//             <div className="card-content">
//               <div className="profile-info">
//                 <div className="info-row">
//                   <label>Name:</label>
//                   <span>{user?.name}</span>
//                 </div>
//                 <div className="info-row">
//                   <label>Email:</label>
//                   <span>{user?.email}</span>
//                 </div>
//                 <div className="info-row">
//                   <label>Mobile:</label>
//                   <span>{user?.mobile}</span>
//                 </div>
//                 <div className="info-row">
//                   <label>Role:</label>
//                   <span>
//                     {user?.role}
//                     {user?.role === 'Other' && user?.otherRole && ` (${user.otherRole})`}
//                   </span>
//                 </div>
//                 <div className="info-row">
//                   <label>Status:</label>
//                   <span className="status-verified">✅ Verified</span>
//                 </div>
//                 <div className="info-row">
//                   <label>Member Since:</label>
//                   <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 {user?.lastLogin && (
//                   <div className="info-row">
//                     <label>Last Login:</label>
//                     <span>{new Date(user.lastLogin).toLocaleString()}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions Card */}
//           <div className="dashboard-card">
//             <div className="card-header">
//               <h3>🚀 Quick Actions</h3>
//             </div>
//             <div className="card-content">
//               <div className="action-buttons">
//                 <button className="action-btn primary">
//                   <span className="btn-icon">📝</span>
//                   New Handwriting Analysis
//                 </button>
//                 <button className="action-btn secondary">
//                   <span className="btn-icon">📊</span>
//                   View Reports
//                 </button>
//                 <button className="action-btn tertiary">
//                   <span className="btn-icon">📁</span>
//                   My Files
//                 </button>
//                 <button className="action-btn quaternary">
//                   <span className="btn-icon">⚙️</span>
//                   Settings
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Recent Activity Card */}
//           <div className="dashboard-card">
//             <div className="card-header">
//               <h3>📈 Recent Activity</h3>
//             </div>
//             <div className="card-content">
//               <div className="activity-list">
//                 <div className="activity-item">
//                   <div className="activity-icon">🔑</div>
//                   <div className="activity-details">
//                     <span className="activity-text">Logged in to dashboard</span>
//                     <span className="activity-time">Just now</span>
//                   </div>
//                 </div>
//                 <div className="activity-item">
//                   <div className="activity-icon">✅</div>
//                   <div className="activity-details">
//                     <span className="activity-text">Account verified by admin</span>
//                     <span className="activity-time">
//                       {user?.verifiedAt ? new Date(user.verifiedAt).toLocaleDateString() : 'Recently'}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="activity-item">
//                   <div className="activity-icon">📝</div>
//                   <div className="activity-details">
//                     <span className="activity-text">Account created</span>
//                     <span className="activity-time">{new Date(user?.createdAt).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* System Info Card */}
//           <div className="dashboard-card">
//             <div className="card-header">
//               <h3>ℹ️ System Information</h3>
//             </div>
//             <div className="card-content">
//               <div className="system-info">
//                 <div className="info-item">
//                   <span className="info-label">System Status:</span>
//                   <span className="status-online">🟢 Online</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="info-label">Version:</span>
//                   <span>v1.0.0</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="info-label">Last Update:</span>
//                   <span>Today</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="info-label">Support:</span>
//                   <span>24/7 Available</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Placeholder for future features */}
//           <div className="dashboard-card coming-soon">
//             <div className="card-header">
//               <h3>🔮 Coming Soon</h3>
//             </div>
//             <div className="card-content">
//               <div className="coming-soon-content">
//                 <p>🎯 Advanced Analytics</p>
//                 <p>📱 Mobile App Integration</p>
//                 <p>🤖 AI-Powered Insights</p>
//                 <p>👥 Team Collaboration</p>
//                 <p>📊 Custom Reports</p>
//               </div>
//             </div>
//           </div>

//           {/* Help & Support Card */}
//           <div className="dashboard-card">
//             <div className="card-header">
//               <h3>🆘 Help & Support</h3>
//             </div>
//             <div className="card-content">
//               <div className="help-links">
//                 <a href="#" className="help-link">
//                   <span className="help-icon">📚</span>
//                   User Guide
//                 </a>
//                 <a href="#" className="help-link">
//                   <span className="help-icon">❓</span>
//                   FAQ
//                 </a>
//                 <a href="#" className="help-link">
//                   <span className="help-icon">💬</span>
//                   Contact Support
//                 </a>
//                 <a href="#" className="help-link">
//                   <span className="help-icon">🎥</span>
//                   Video Tutorials
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'user') {
      navigate('/user-login');
      return;
    }

    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/user/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      navigate('/');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  if (loading) {
    return (
      <div className={`dashboard-loading ${darkMode ? 'dark' : ''}`}>
        <div className="loading-animation">
          <div className="orbit">
            <div className="moon"></div>
            <div className="moon"></div>
            <div className="moon"></div>
          </div>
          <p>Loading Your Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
      {/* Floating Background Elements */}
      <div className="floating-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">
            <span className="logo-icon">✍️</span>
            <h1>GraphoGenius <span className="user-badge">User</span></h1>
          </div>
          
          <div className="header-actions">
            <div className="user-menu">
              <div className="user-avatar">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user?.name}</span>
              
              <div className="theme-toggle" onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
              </div>
              
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Profile Card */}
          <div className="dashboard-card profile-card floating" data-aos="fade-up">
            <div className="card-header">
              <div className="card-icon">👤</div>
              <h3>Profile Information</h3>
            </div>
            <div className="card-content">
              <div className="profile-info">
                <div className="info-row">
                  <label>Name:</label>
                  <span>{user?.name}</span>
                </div>
                <div className="info-row">
                  <label>Email:</label>
                  <span>{user?.email}</span>
                </div>
                <div className="info-row">
                  <label>Mobile:</label>
                  <span>{user?.mobile}</span>
                </div>
                <div className="info-row">
                  <label>Role:</label>
                  <span className="role-badge">
                    {user?.role}
                    {user?.role === 'Other' && user?.otherRole && ` (${user.otherRole})`}
                  </span>
                </div>
                <div className="info-row">
                  <label>Status:</label>
                  <span className="status-badge verified pulse">
                    ✅ Verified
                  </span>
                </div>
                <div className="info-row">
                  <label>Member Since:</label>
                  <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
                {user?.lastLogin && (
                  <div className="info-row">
                    <label>Last Login:</label>
                    <span>{new Date(user.lastLogin).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card floating" data-aos="fade-up" data-aos-delay="100">
            <div className="card-header">
              <div className="card-icon">🚀</div>
              <h3>Quick Actions</h3>
            </div>
            <div className="card-content">
              <div className="action-buttons">
                <button
      className="action-btn primary neon-hover"
      onClick={() => navigate('/dashboard')}
    >
      <span className="btn-icon">📝</span>
      New Analysis
    </button>
                <button className="action-btn secondary neon-hover">
                  <span className="btn-icon">📊</span>
                  View Reports
                </button>
                <button className="action-btn tertiary neon-hover">
                  <span className="btn-icon">📁</span>
                  My Files
                </button>
                <button className="action-btn quaternary neon-hover">
                  <span className="btn-icon">⚙️</span>
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="dashboard-card floating" data-aos="fade-up" data-aos-delay="200">
            <div className="card-header">
              <div className="card-icon">📈</div>
              <h3>Recent Activity</h3>
            </div>
            <div className="card-content">
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">🔑</div>
                  <div className="activity-details">
                    <span className="activity-text">Logged in to dashboard</span>
                    <span className="activity-time">Just now</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">✅</div>
                  <div className="activity-details">
                    <span className="activity-text">Account verified by admin</span>
                    <span className="activity-time">
                      {user?.verifiedAt ? new Date(user.verifiedAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-details">
                    <span className="activity-text">Account created</span>
                    <span className="activity-time">{new Date(user?.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Info Card */}
          <div className="dashboard-card floating" data-aos="fade-up" data-aos-delay="300">
            <div className="card-header">
              <div className="card-icon">ℹ️</div>
              <h3>System Information</h3>
            </div>
            <div className="card-content">
              <div className="system-info">
                <div className="info-item">
                  <span className="info-label">System Status:</span>
                  <span className="status-online">🟢 Online</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Version:</span>
                  <span>v2.1.0</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Update:</span>
                  <span>Today</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Support:</span>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="dashboard-card coming-soon floating" data-aos="fade-up" data-aos-delay="400">
            <div className="card-header">
              <div className="card-icon">🔮</div>
              <h3>Coming Soon</h3>
            </div>
            <div className="card-content">
              <div className="coming-soon-content">
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>Advanced Analytics</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <span>Mobile App</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🤖</span>
                  <span>AI Insights</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👥</span>
                  <span>Team Features</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className="dashboard-card floating" data-aos="fade-up" data-aos-delay="500">
            <div className="card-header">
              <div className="card-icon">🆘</div>
              <h3>Help & Support</h3>
            </div>
            <div className="card-content">
              <div className="help-links">
                <a href="#" className="help-link neon-hover">
                  <span className="help-icon">📚</span>
                  User Guide
                </a>
                <a href="#" className="help-link neon-hover">
                  <span className="help-icon">❓</span>
                  FAQ
                </a>
                <a href="#" className="help-link neon-hover">
                  <span className="help-icon">💬</span>
                  Live Chat
                </a>
                <a href="#" className="help-link neon-hover">
                  <span className="help-icon">🎥</span>
                  Tutorials
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="quick-actions">
        <button className="quick-action" onClick={() => window.scrollTo(0, 0)}>
          <span className="action-icon">⬆️</span>
          <span className="action-text">Top</span>
        </button>
        <button className="quick-action" onClick={fetchUserProfile}>
          <span className="action-icon">🔄</span>
          <span className="action-text">Refresh</span>
        </button>
        <button className="quick-action" onClick={toggleDarkMode}>
          <span className="action-icon">{darkMode ? '☀️' : '🌙'}</span>
          <span className="action-text">Theme</span>
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;