// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Auth.css';

// const UserRegistration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     role: '',
//     otherRole: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const roles = [
//     'Graphologist',
//     'Hiring Manager',
//     'Psychiatrist',
//     'Other'
//   ];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Validation
//     if (formData.role === 'Other' && !formData.otherRole.trim()) {
//       setError('Please specify your role when selecting "Other"');
//       setLoading(false);
//       return;
//     }

//     // Mobile validation
//     const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
//     if (!mobileRegex.test(formData.mobile.replace(/[\s\-\(\)]/g, ''))) {
//       setError('Please enter a valid mobile number');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/register', formData);
//       setSuccess(true);
      
//       // Redirect to login page after 3 seconds
//       setTimeout(() => {
//         navigate('/user-login');
//       }, 3000);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="auth-container">
//         <div className="auth-background">
//           <div className="auth-card">
//             <div className="success-message">
//               <div className="success-icon">✅</div>
//               <h2>Registration Successful!</h2>
//               <p>Your registration request has been submitted successfully.</p>
//               <div className="success-details">
//                 <h4>What happens next?</h4>
//                 <ul>
//                   <li>Your request has been sent to our admin team</li>
//                   <li>You'll receive an email notification once approved</li>
//                   <li>The email will contain your login credentials</li>
//                   <li>You can then access the system using those credentials</li>
//                 </ul>
//               </div>
//               <p className="redirect-message">Redirecting to login page...</p>
//               <Link to="/user-login" className="auth-btn">Go to Login Now</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-background">
//         <div className="auth-card">
//           <div className="auth-header">
//             <h2>User Registration</h2>
//             <p>Join our handwriting analysis platform</p>
//           </div>

//           <form onSubmit={handleSubmit} className="auth-form">
//             {error && (
//               <div className="error-message">
//                 {error}
//               </div>
//             )}

//             <div className="form-group">
//               <label htmlFor="name">Full Name *</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your full name"
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email Address *</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email address"
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="mobile">Mobile Number *</label>
//               <input
//                 type="tel"
//                 id="mobile"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your mobile number"
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="role">Professional Role *</label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//                 disabled={loading}
//               >
//                 <option value="">Select your role</option>
//                 {roles.map(role => (
//                   <option key={role} value={role}>{role}</option>
//                 ))}
//               </select>
//             </div>

//             {formData.role === 'Other' && (
//               <div className="form-group">
//                 <label htmlFor="otherRole">Please specify your role *</label>
//                 <input
//                   type="text"
//                   id="otherRole"
//                   name="otherRole"
//                   value={formData.otherRole}
//                   onChange={handleChange}
//                   required
//                   placeholder="Specify your professional role"
//                   disabled={loading}
//                 />
//               </div>
//             )}

//             <button 
//               type="submit" 
//               className="auth-btn"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="loading-spinner">
//                   <span className="spinner"></span>
//                   Registering...
//                 </span>
//               ) : (
//                 'Register'
//               )}
//             </button>
//           </form>

//           <div className="auth-links">
//             <p>Already have an account? <Link to="/user-login">Login here</Link></p>
//             <p><Link to="/">Back to Home</Link></p>
//           </div>

//           <div className="auth-info">
//             <div className="info-box">
//               <h4>Registration Process</h4>
//               <ul>
//                 <li>Fill out the registration form</li>
//                 <li>Wait for admin approval (usually within 24 hours)</li>
//                 <li>Receive login credentials via email</li>
//                 <li>Access your dashboard and start using the system</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserRegistration;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
    otherRole: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const roles = [
    'Graphologist',
    'Hiring Manager',
    'Psychiatrist',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.role === 'Other' && !formData.otherRole.trim()) {
      setError('Please specify your role when selecting "Other"');
      setLoading(false);
      return;
    }

    const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!mobileRegex.test(formData.mobile.replace(/[\s\-\(\)]/g, ''))) {
      setError('Please enter a valid mobile number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/user-login');
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="floating-shapes">
          <div className="shape-1"></div>
          <div className="shape-2"></div>
          <div className="shape-3"></div>
        </div>

        <div className="auth-card success-card">
          <div className="success-animation">
            <div className="checkmark">✓</div>
          </div>
          <h2>Registration Successful!</h2>
          <p className="success-subtext">Your request has been submitted for admin approval</p>
          
          <div className="success-steps">
            <div className="step">
              <div className="step-icon">1</div>
              <p>Admin will review your application</p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <p>You'll receive login credentials via email</p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <p>Access your dashboard after approval</p>
            </div>
          </div>

          <div className="redirect-message">
            <p>Redirecting to login page in 3 seconds...</p>
            <Link to="/user-login" className="btn btn-primary">
              Go to Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="floating-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>

      <div className="auth-card floating">
        <div className="auth-header">
          <div className="logo">
            <span className="logo-icon">✍️</span>
            <span className="logo-text">GraphoGenius</span>
          </div>
          <h2>Create Your Account</h2>
          <p>Join our handwriting analysis platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message shake">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                disabled={loading}
              />
              <span className="input-icon"></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="hello@example.com"
                disabled={loading}
              />
              <span className="input-icon"></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="+1 234 567 8900"
                disabled={loading}
              />
              <span className="input-icon"></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Professional Role</label>
            <div className="select-wrapper">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select your role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          {formData.role === 'Other' && (
            <div className="form-group">
              <label htmlFor="otherRole">Specify Your Role</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="otherRole"
                  name="otherRole"
                  value={formData.otherRole}
                  onChange={handleChange}
                  required
                  placeholder="Your professional role"
                  disabled={loading}
                />
                <span className="input-icon">💼</span>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="auth-btn neon-hover"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Registering...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>Already registered?</span>
        </div>

        <div className="auth-footer">
          <Link to="/user-login" className="btn btn-outline">
            Sign In Instead
          </Link>
          <p className="auth-info-text">
            By registering, you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;