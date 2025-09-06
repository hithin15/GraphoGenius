import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'admin') {
      navigate('/admin-login');
      return;
    }

    const storedAdmin = JSON.parse(localStorage.getItem('user'));
    setAdmin(storedAdmin);
    
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [pendingResponse, usersResponse, activitiesResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/pending-users', { headers }),
        axios.get('http://localhost:5000/api/admin/users', { headers }),
        axios.get('http://localhost:5000/api/admin/user-activities', { headers })
      ]);

      setPendingUsers(pendingResponse.data);
      setAllUsers(usersResponse.data);
      setUserActivities(activitiesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/admin/verify-user/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await fetchData();
      alert('User verified successfully! Credentials sent via email.');
    } catch (error) {
      console.error('Error verifying user:', error);
      alert('Error verifying user: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const getActivityIcon = (action) => {
    const icons = {
      login: '🔓',
      logout: '🔒',
      register: '📝',
      verify: '✅',
      analysis: '📊',
      default: '⚡'
    };
    return icons[action] || icons.default;
  };

  const getStatusBadge = (user) => {
    return user.isVerified ? (
      <span className="status-badge verified pulse">✅ Verified</span>
    ) : (
      <span className="status-badge pending">⏳ Pending</span>
    );
  };

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = userActivities.filter(activity => 
    (activity.userId?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className={`dashboard-loading ${darkMode ? 'dark' : ''}`}>
        <div className="loading-animation">
          <div className="orbit">
            <div className="moon"></div>
            <div className="moon"></div>
            <div className="moon"></div>
          </div>
          <p>Loading Admin Dashboard...</p>
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
            <span className="logo-icon">🛡️</span>
            <h1>GraphoGenius <span className="admin-badge">Admin</span></h1>
          </div>
          
          <div className="header-actions">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="user-menu">
              <div className="user-avatar">
                {admin?.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{admin?.name}</span>
              
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
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card" data-aos="fade-up">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{allUsers.length}</h3>
              <p>Total Users</p>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="stat-card pending" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{pendingUsers.length}</h3>
              <p>Pending Approvals</p>
              <div className="stat-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${(pendingUsers.length / allUsers.length) * 100}%`,
                    background: 'var(--accent)'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="stat-card verified" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{allUsers.filter(u => u.isVerified).length}</h3>
              <p>Verified Users</p>
              <div className="stat-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${(allUsers.filter(u => u.isVerified).length / allUsers.length) * 100}%`,
                    background: 'var(--success)'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="stat-card active" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-icon">🔑</div>
            <div className="stat-info">
              <h3>{userActivities.filter(a => a.action === 'login').length}</h3>
              <p>Recent Logins</p>
              <div className="stat-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${Math.min(100, userActivities.filter(a => a.action === 'login').length)}%`,
                    background: 'var(--primary)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tab-navigation" data-aos="fade-up">
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            <span className="tab-icon">⏳</span>
            Pending Requests
            <span className="badge">{pendingUsers.length}</span>
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="tab-icon">👥</span>
            All Users
            <span className="badge">{allUsers.length}</span>
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            <span className="tab-icon">📊</span>
            Activities
            <span className="badge">{userActivities.length}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content" data-aos="fade-up">
          {activeTab === 'pending' && (
            <div className="data-table-container">
              <div className="table-header">
                <h3>Pending Approval Requests</h3>
                <div className="table-actions">
                  <button className="refresh-btn" onClick={fetchData}>
                    🔄 Refresh
                  </button>
                </div>
              </div>
              
              {pendingUsers.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🎉</div>
                  <h4>No Pending Requests</h4>
                  <p>All registration requests have been processed</p>
                </div>
              ) : (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Registered</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingUsers.map(user => (
                        <tr key={user._id}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong>{user.name}</strong>
                                <small>{user.email}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <span>{user.email}</span>
                              <small>{user.mobile}</small>
                            </div>
                          </td>
                          <td>
                            <span className={`role-badge ${user.role.toLowerCase()}`}>
                              {user.role}
                              {user.role === 'Other' && user.otherRole && (
                                <small> ({user.otherRole})</small>
                              )}
                            </span>
                          </td>
                          <td>
                            {new Date(user.createdAt).toLocaleDateString()}
                            <small>{new Date(user.createdAt).toLocaleTimeString()}</small>
                          </td>
                          <td>
                            <button
                              className="action-btn approve"
                              onClick={() => handleVerifyUser(user._id)}
                              disabled={actionLoading === user._id}
                            >
                              {actionLoading === user._id ? (
                                <span className="loading-spinner">
                                  <span className="spinner-sm"></span>
                                </span>
                              ) : (
                                '✅ Approve'
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="data-table-container">
              <div className="table-header">
                <h3>User Management</h3>
                <div className="table-actions">
                  <input 
                    type="text" 
                    placeholder="Filter users..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="refresh-btn" onClick={fetchData}>
                    🔄 Refresh
                  </button>
                </div>
              </div>
              
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Status</th>
                      <th>Role</th>
                      <th>Last Activity</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user._id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <strong>{user.name}</strong>
                              <small>{user.email}</small>
                            </div>
                          </div>
                        </td>
                        <td>{getStatusBadge(user)}</td>
                        <td>
                          <span className={`role-badge ${user.role.toLowerCase()}`}>
                            {user.role}
                            {user.role === 'Other' && user.otherRole && (
                              <small> ({user.otherRole})</small>
                            )}
                          </span>
                        </td>
                        <td>
                          {user.lastLogin ? (
                            <div className="activity-time">
                              {new Date(user.lastLogin).toLocaleDateString()}
                              <small>{new Date(user.lastLogin).toLocaleTimeString()}</small>
                            </div>
                          ) : (
                            <span className="never-logged">Never</span>
                          )}
                        </td>
                        <td>
                          <button className="view-btn">
                            👁️ View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="data-table-container">
              <div className="table-header">
                <h3>User Activities</h3>
                <div className="table-actions">
                  <input 
                    type="text" 
                    placeholder="Filter activities..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="refresh-btn" onClick={fetchData}>
                    🔄 Refresh
                  </button>
                </div>
              </div>
              
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>User</th>
                      <th>Timestamp</th>
                      <th>IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.map(activity => (
                      <tr key={activity._id}>
                        <td>
                          <div className="activity-info">
                            <span className="activity-icon">
                              {getActivityIcon(activity.action)}
                            </span>
                            <span className="activity-text">
                              {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td>
                          {activity.userId ? (
                            <div className="user-info">
                              <div className="user-avatar-sm">
                                {activity.userId.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong>{activity.userId.name}</strong>
                                <small>{activity.userId.email}</small>
                              </div>
                            </div>
                          ) : (
                            <span className="unknown-user">System</span>
                          )}
                        </td>
                        <td>
                          <div className="activity-time">
                            {new Date(activity.timestamp).toLocaleDateString()}
                            <small>{new Date(activity.timestamp).toLocaleTimeString()}</small>
                          </div>
                        </td>
                        <td>
                          <code className="ip-address">{activity.ipAddress || 'N/A'}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="quick-actions">
        <button className="quick-action" onClick={() => setActiveTab('pending')}>
          <span className="action-icon">⏳</span>
          <span className="action-text">Pending</span>
        </button>
        <button className="quick-action" onClick={() => window.scrollTo(0, 0)}>
          <span className="action-icon">⬆️</span>
          <span className="action-text">Top</span>
        </button>
        <button className="quick-action" onClick={fetchData}>
          <span className="action-icon">🔄</span>
          <span className="action-text">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;