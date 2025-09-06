// // import React, { useState } from 'react';
// // import FileUpload from './FileUpload';
// // import Questionnaire from './Questionnaire';
// // import WeightSlider from './WeightSlider';
// // import Results from './Results';
// // import axios from 'axios';
// // import './Dashboard.css';
// // const Dashboard = () => {
// //   const [scriptScores, setScriptScores] = useState(null);
// //   const [questionnaireScores, setQuestionnaireScores] = useState(null);
// //   const [combinedScores, setCombinedScores] = useState(null);
// //   const [mImages, setMImages] = useState(null);
// //   const [weight, setWeight] = useState(50);
// //   const [isAnalyzing, setIsAnalyzing] = useState(false);

// //   const handleUploadSuccess = (data) => {
// //     setScriptScores(data.script_scores);
// //     setMImages(data.m_images);
// //     setQuestionnaireScores(null);
// //     setCombinedScores(null);
// //   };

// //   const handleQuestionnaireSubmit = async (scores) => {
// //     setQuestionnaireScores(scores);
// //     setIsAnalyzing(true);
    
// //     try {
// //       const response = await axios.post('http://localhost:5001/analyze', {
// //         script_scores: scriptScores,
// //         questionnaire_scores: scores,
// //         weight: weight
// //       });
      
// //       setCombinedScores(response.data.combined_scores);
// //     } catch (err) {
// //       console.error('Analysis error:', err);
// //     } finally {
// //       setIsAnalyzing(false);
// //     }
// //   };

// //   const handleWeightChange = (newWeight) => {
// //     setWeight(newWeight);
// //     if (questionnaireScores) {
// //       handleQuestionnaireSubmit(questionnaireScores);
// //     }
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <h1>Handwriting Analysis Dashboard</h1>
      
// //       <div className="input-section">
// //         <FileUpload onUploadSuccess={handleUploadSuccess} />
        
// //         {scriptScores && (
// //           <>
// //             <Questionnaire onSubmit={handleQuestionnaireSubmit} />
// //             <WeightSlider weight={weight} onChange={handleWeightChange} />
// //           </>
// //         )}
// //       </div>
      
// //       <Results
// //         scriptScores={scriptScores}
// //         questionnaireScores={questionnaireScores}
// //         combinedScores={combinedScores}
// //         mImages={mImages}
// //       />
      
// //       {isAnalyzing && <div className="loading-overlay">Analyzing...</div>}
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useState } from 'react';
// import { Bar, Radar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler
// } from 'chart.js';
// import { Upload, FileText, BarChart3, Settings, Brain, Activity, Eye, Zap } from 'lucide-react';
// import './AnalysisDashboard.css';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler
// );

// // FileUpload Component
// const ModernFileUpload = ({ onUploadSuccess }) => {
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [dragActive, setDragActive] = useState(false);

//   const handleFileChange = (selectedFile) => {
//     if (!selectedFile) return;

//     setError('');
//     const fileExt = selectedFile.name.split('.').pop().toLowerCase();
//     const validExtensions = ['png', 'jpg', 'jpeg'];
    
//     if (!validExtensions.includes(fileExt)) {
//       setError('Please upload a PNG, JPEG, or JPG file');
//       return;
//     }

//     if (selectedFile.size > 5 * 1024 * 1024) {
//       setError('File size must be less than 5MB');
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       handleFileChange(droppedFile);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a file first');
//       return;
//     }

//     setIsUploading(true);
//     setError('');

//     // Simulate upload process - replace with actual API call
    

//     // Uncomment below for actual API call
    
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5001/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 120000
//       });

//       if (response.data.status === 'success') {
//         onUploadSuccess(response.data);
//       } else {
//         throw new Error(response.data.error || 'Processing failed');
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       let errorMsg = 'Upload failed';
//       if (err.code === 'ECONNABORTED') {
//         errorMsg = 'The request took too long. Try a smaller image or check your connection.';
//       } else if (err.response) {
//         errorMsg = err.response.data?.error || `Server error: ${err.response.status}`;
//       } else if (err.message) {
//         errorMsg = err.message;
//       }
//       setError(errorMsg);
//     } finally {
//       setIsUploading(false);
//     }
    
//   };

//   return (
//     <div className="upload-card">
//       <div className="upload-header">
//         <Upload className="upload-icon" />
//         <h3>Upload Handwriting Sample</h3>
//         <p>Drag & drop your handwriting image or click to browse</p>
//       </div>
      
//       <div 
//         className={`drop-zone ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         onClick={() => document.getElementById('fileInput').click()}
//       >
//         <input
//           id="fileInput"
//           type="file"
//           onChange={(e) => handleFileChange(e.target.files[0])}
//           accept=".png,.jpg,.jpeg"
//           disabled={isUploading}
//           style={{ display: 'none' }}
//         />
        
//         {file ? (
//           <div className="file-preview">
//             <FileText className="file-icon" />
//             <div>
//               <p className="file-name">{file.name}</p>
//               <p className="file-details">{(file.size / 1024).toFixed(1)} KB</p>
//             </div>
//           </div>
//         ) : (
//           <div className="drop-zone-content">
//             <Upload className="drop-icon" />
//             <p>Drop your handwriting image here</p>
//             <span>PNG, JPG, JPEG up to 5MB</span>
//           </div>
//         )}
//       </div>

//       {error && (
//         <div className="error-message">
//           <span>{error}</span>
//         </div>
//       )}

//       <button
//         onClick={handleUpload}
//         disabled={isUploading || !file}
//         className={`upload-button ${isUploading ? 'uploading' : ''}`}
//       >
//         {isUploading ? (
//           <>
//             <div className="spinner"></div>
//             Processing...
//           </>
//         ) : (
//           <>
//             <Brain className="button-icon" />
//             Analyze Handwriting
//           </>
//         )}
//       </button>
//     </div>
//   );
// };

// // Questionnaire Component
// const ModernQuestionnaire = ({ onSubmit }) => {
//   const [scores, setScores] = useState({
//     Cumulative: 0,
//     Investigative: 0,
//     Comprehensive: 0,
//     Analytical: 0
//   });

//   const handleScoreChange = (pattern, value) => {
//     const numValue = parseFloat(value) || 0;
//     setScores(prev => ({
//       ...prev,
//       [pattern]: Math.min(100, Math.max(0, numValue))
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(scores);
//   };

//   const scoreIcons = {
//     Cumulative: Activity,
//     Investigative: Eye,
//     Comprehensive: BarChart3,
//     Analytical: Zap
//   };

//   return (
//     <div className="questionnaire-card">
//       <div className="questionnaire-header">
//         <Settings className="questionnaire-icon" />
//         <h3>Questionnaire Scores</h3>
//         <p>Enter your assessment scores for each category</p>
//       </div>
      
//       <form onSubmit={handleSubmit} className="questionnaire-form">
//         {Object.entries(scores).map(([pattern, value]) => {
//           const IconComponent = scoreIcons[pattern];
//           return (
//             <div key={pattern} className="score-input-group">
//               <label className="score-label">
//                 <IconComponent className="score-icon" />
//                 <span>{pattern} Score</span>
//               </label>
//               <div className="input-container">
//                 <input
//                   type="number"
//                   min="0"
//                   max="100"
//                   value={value}
//                   onChange={(e) => handleScoreChange(pattern, e.target.value)}
//                   className="score-input"
//                 />
//                 <span className="input-suffix">%</span>
//               </div>
//               <div className="progress-bar">
//                 <div 
//                   className="progress-fill"
//                   style={{ width: `${value}%` }}
//                 ></div>
//               </div>
//             </div>
//           );
//         })}
        
//         <button type="submit" className="submit-button">
//           <BarChart3 className="button-icon" />
//           Submit Scores
//         </button>
//       </form>
//     </div>
//   );
// };

// // Weight Slider Component
// const ModernWeightSlider = ({ weight, onChange }) => {
//   return (
//     <div className="weight-slider-card">
//       <div className="slider-header">
//         <Settings className="slider-icon" />
//         <h3>Analysis Weight Distribution</h3>
//       </div>
      
//       <div className="weight-display">
//         <div className="weight-item script-weight">
//           <span className="weight-label">Script Analysis</span>
//           <span className="weight-value">{weight}%</span>
//         </div>
//         <div className="weight-item questionnaire-weight">
//           <span className="weight-label">Questionnaire</span>
//           <span className="weight-value">{100 - weight}%</span>
//         </div>
//       </div>
      
//       <div className="slider-container">
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={weight}
//           onChange={(e) => onChange(parseInt(e.target.value))}
//           className="weight-slider"
//         />
//         <div className="slider-track">
//           <div 
//             className="slider-fill"
//             style={{ width: `${weight}%` }}
//           ></div>
//         </div>
//       </div>
      
//       <div className="slider-labels">
//         <span>0%</span>
//         <span>25%</span>
//         <span>50%</span>
//         <span>75%</span>
//         <span>100%</span>
//       </div>
//     </div>
//   );
// };

// // Results Component
// const ModernResults = ({ scriptScores, questionnaireScores, combinedScores, mImages }) => {
//   if (!scriptScores) return null;

//   const chartColors = {
//     script: {
//       background: 'rgba(99, 102, 241, 0.8)',
//       border: 'rgb(99, 102, 241)'
//     },
//     combined: {
//       background: 'rgba(16, 185, 129, 0.8)',
//       border: 'rgb(16, 185, 129)'
//     }
//   };

//   const scriptBarData = {
//     labels: Object.keys(scriptScores),
//     datasets: [
//       {
//         label: 'Script Analysis',
//         data: Object.values(scriptScores),
//         backgroundColor: chartColors.script.background,
//         borderColor: chartColors.script.border,
//         borderWidth: 2,
//         borderRadius: 8,
//         borderSkipped: false
//       }
//     ]
//   };

//   const radarData = combinedScores ? {
//     labels: Object.keys(combinedScores),
//     datasets: [
//       {
//         label: 'Script Analysis',
//         data: Object.keys(combinedScores).map(key => scriptScores[key] || 0),
//         backgroundColor: 'rgba(99, 102, 241, 0.2)',
//         borderColor: 'rgb(99, 102, 241)',
//         pointBackgroundColor: 'rgb(99, 102, 241)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgb(99, 102, 241)'
//       },
//       {
//         label: 'Combined Analysis',
//         data: Object.values(combinedScores),
//         backgroundColor: 'rgba(16, 185, 129, 0.2)',
//         borderColor: 'rgb(16, 185, 129)',
//         pointBackgroundColor: 'rgb(16, 185, 129)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgb(16, 185, 129)'
//       }
//     ]
//   } : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           usePointStyle: true,
//           padding: 20
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)'
//         }
//       },
//       x: {
//         grid: {
//           display: false
//         }
//       }
//     }
//   };

//   const radarOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top'
//       }
//     },
//     scales: {
//       r: {
//         beginAtZero: true,
//         max: 100,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)'
//         },
//         pointLabels: {
//           font: {
//             size: 12
//           }
//         }
//       }
//     }
//   };

//   return (
//     <div className="results-section">
//       <div className="results-header">
//         <BarChart3 className="results-icon" />
//         <h2>Analysis Results</h2>
//       </div>
      
//       <div className="results-grid">
//         <div className="chart-card">
//           <h3>Script Analysis Overview</h3>
//           <div className="chart-container">
//             <Bar data={scriptBarData} options={chartOptions} />
//           </div>
//           <div className="scores-grid">
//             {Object.entries(scriptScores).map(([pattern, score]) => (
//               <div key={pattern} className="score-card">
//                 <span className="score-pattern">{pattern}</span>
//                 <span className="score-value">{score.toFixed(1)}%</span>
//                 <div className="score-bar">
//                   <div 
//                     className="score-fill"
//                     style={{ width: `${score}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {combinedScores && (
//           <div className="chart-card">
//             <h3>Comprehensive Analysis</h3>
//             <div className="chart-container">
//               <Radar data={radarData} options={radarOptions} />
//             </div>
//             <div className="scores-grid">
//               {Object.entries(combinedScores).map(([pattern, score]) => (
//                 <div key={pattern} className="score-card combined">
//                   <span className="score-pattern">{pattern}</span>
//                   <span className="score-value">{score.toFixed(1)}%</span>
//                   <div className="score-bar">
//                     <div 
//                       className="score-fill combined"
//                       style={{ width: `${score}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {questionnaireScores && (
//           <div className="questionnaire-results">
//             <h3>Questionnaire Scores</h3>
//             <div className="scores-grid">
//               {Object.entries(questionnaireScores).map(([pattern, score]) => (
//                 <div key={pattern} className="score-card questionnaire">
//                   <span className="score-pattern">{pattern}</span>
//                   <span className="score-value">{score}%</span>
//                   <div className="score-bar">
//                     <div 
//                       className="score-fill questionnaire"
//                       style={{ width: `${score}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {mImages && mImages.length > 0 && (
//         <div className="m-images-preview">
//           <h3>Extracted Letter Samples</h3>
//           <div className="image-grid">
//             {mImages.slice(0, 5).map((img, index) => (
//               <div key={index} className="image-item">
//                 <div className="sample-placeholder">
//                   M
//                 </div>
//                 <p>Sample {index + 1}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Dashboard Component
// const Dashboard = () => {
//   const [scriptScores, setScriptScores] = useState(null);
//   const [questionnaireScores, setQuestionnaireScores] = useState(null);
//   const [combinedScores, setCombinedScores] = useState(null);
//   const [mImages, setMImages] = useState(null);
//   const [weight, setWeight] = useState(50);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleUploadSuccess = (data) => {
//     setScriptScores(data.script_scores);
//     setMImages(data.m_images);
//     setQuestionnaireScores(null);
//     setCombinedScores(null);
//     setCurrentStep(2);
//   };

//   const handleQuestionnaireSubmit = async (scores) => {
//     setQuestionnaireScores(scores);
//     setIsAnalyzing(true);
//     setCurrentStep(3);
    
//     // Simulate analysis
//     setTimeout(() => {
//       const combined = {};
//       Object.keys(scriptScores).forEach(key => {
//         const scriptValue = scriptScores[key] || 0;
//         const questionnaireValue = scores[key] || 0;
//         combined[key] = (scriptValue * weight / 100) + (questionnaireValue * (100 - weight) / 100);
//       });
//       setCombinedScores(combined);
//       setIsAnalyzing(false);
//     }, 2000);

//     // Uncomment for actual API call
    
//     try {
//       const response = await axios.post('http://localhost:5001/analyze', {
//         script_scores: scriptScores,
//         questionnaire_scores: scores,
//         weight: weight
//       });
      
//       setCombinedScores(response.data.combined_scores);
//     } catch (err) {
//       console.error('Analysis error:', err);
//     } finally {
//       setIsAnalyzing(false);
//     }
    
//   };

//   const handleWeightChange = (newWeight) => {
//     setWeight(newWeight);
//     if (questionnaireScores) {
//       const combined = {};
//       Object.keys(scriptScores).forEach(key => {
//         const scriptValue = scriptScores[key] || 0;
//         const questionnaireValue = questionnaireScores[key] || 0;
//         combined[key] = (scriptValue * newWeight / 100) + (questionnaireValue * (100 - newWeight) / 100);
//       });
//       setCombinedScores(combined);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1 className="dashboard-title">Handwriting Analysis</h1>
//         <p className="dashboard-subtitle">Advanced AI-powered personality insights from handwriting patterns</p>
//       </div>

//       <div className="progress-indicator">
//         <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${scriptScores ? 'completed' : ''}`}>
//           <Upload className="button-icon" />
//           <span>Upload Sample</span>
//         </div>
//         <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${questionnaireScores ? 'completed' : ''}`}>
//           <Settings className="button-icon" />
//           <span>Questionnaire</span>
//         </div>
//         <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${combinedScores ? 'completed' : ''}`}>
//           <BarChart3 className="button-icon" />
//           <span>Analysis</span>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="input-section">
//           <ModernFileUpload onUploadSuccess={handleUploadSuccess} />
          
//           {scriptScores && (
//             <>
//               <ModernQuestionnaire onSubmit={handleQuestionnaireSubmit} />
//               <ModernWeightSlider weight={weight} onChange={handleWeightChange} />
//             </>
//           )}
//         </div>
        
//         <ModernResults
//           scriptScores={scriptScores}
//           questionnaireScores={questionnaireScores}
//           combinedScores={combinedScores}
//           mImages={mImages}
//         />
        
//         {isAnalyzing && (
//           <div className="loading-overlay">
//             <div className="loading-content">
//               <div className="loading-spinner"></div>
//               <div>Analyzing handwriting patterns...</div>
//               <div className="loading-subtitle">
//                 Processing psychological insights from your handwriting
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Upload, FileText, BarChart3, Settings, Brain, Activity, Eye, Zap } from 'lucide-react';
// import axios from 'axios'; // Uncomment this when you want to use actual API calls
import './AnalysisDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

// FileUpload Component
const ModernFileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    setError('');
    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    const validExtensions = ['png', 'jpg', 'jpeg'];
    
    if (!validExtensions.includes(fileExt)) {
      setError('Please upload a PNG, JPEG, or JPG file');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError('');

    // Simulate upload process - replace with actual API call
    

    // Uncomment below for actual API call
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 120000
      });

      if (response.data.status === 'success') {
        onUploadSuccess(response.data);
      } else {
        throw new Error(response.data.error || 'Processing failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      let errorMsg = 'Upload failed';
      if (err.code === 'ECONNABORTED') {
        errorMsg = 'The request took too long. Try a smaller image or check your connection.';
      } else if (err.response) {
        errorMsg = err.response.data?.error || `Server error: ${err.response.status}`;
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setIsUploading(false);
    }
    
  };

  return (
    <div className="upload-card">
      <div className="upload-header">
        <Upload className="upload-icon" />
        <h3>Upload Handwriting Sample</h3>
        <p>Drag & drop your handwriting image or click to browse</p>
      </div>
      
      <div 
        className={`drop-zone ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          onChange={(e) => handleFileChange(e.target.files[0])}
          accept=".png,.jpg,.jpeg"
          disabled={isUploading}
          style={{ display: 'none' }}
        />
        
        {file ? (
          <div className="file-preview">
            <FileText className="file-icon" />
            <div>
              <p className="file-name">{file.name}</p>
              <p className="file-details">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        ) : (
          <div className="drop-zone-content">
            <Upload className="drop-icon" />
            <p>Drop your handwriting image here</p>
            <span>PNG, JPG, JPEG up to 5MB</span>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading || !file}
        className={`upload-button ${isUploading ? 'uploading' : ''}`}
      >
        {isUploading ? (
          <>
            <div className="spinner"></div>
            Processing...
          </>
        ) : (
          <>
            <Brain className="button-icon" />
            Analyze Handwriting
          </>
        )}
      </button>
    </div>
  );
};

// Questionnaire Component
const ModernQuestionnaire = ({ onSubmit }) => {
  const [scores, setScores] = useState({
    Cumulative: 0,
    Investigative: 0,
    Comprehensive: 0,
    Analytical: 0
  });

  const handleScoreChange = (pattern, value) => {
    const numValue = parseFloat(value) || 0;
    setScores(prev => ({
      ...prev,
      [pattern]: Math.min(100, Math.max(0, numValue))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(scores);
  };

  const scoreIcons = {
    Cumulative: Activity,
    Investigative: Eye,
    Comprehensive: BarChart3,
    Analytical: Zap
  };

  return (
    <div className="questionnaire-card">
      <div className="questionnaire-header">
        <Settings className="questionnaire-icon" />
        <h3>Questionnaire Scores</h3>
        <p>Enter your assessment scores for each category</p>
      </div>
      
      <form onSubmit={handleSubmit} className="questionnaire-form">
        {Object.entries(scores).map(([pattern, value]) => {
          const IconComponent = scoreIcons[pattern];
          return (
            <div key={pattern} className="score-input-group">
              <label className="score-label">
                <IconComponent className="score-icon" />
                <span>{pattern} Score</span>
              </label>
              <div className="input-container">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleScoreChange(pattern, e.target.value)}
                  className="score-input"
                />
                <span className="input-suffix">%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        
        <button type="submit" className="submit-button">
          <BarChart3 className="button-icon" />
          Submit Scores
        </button>
      </form>
    </div>
  );
};

// Weight Slider Component
const ModernWeightSlider = ({ weight, onChange }) => {
  return (
    <div className="weight-slider-card">
      <div className="slider-header">
        <Settings className="slider-icon" />
        <h3>Analysis Weight Distribution</h3>
      </div>
      
      <div className="weight-display">
        <div className="weight-item script-weight">
          <span className="weight-label">Script Analysis</span>
          <span className="weight-value">{weight}%</span>
        </div>
        <div className="weight-item questionnaire-weight">
          <span className="weight-label">Questionnaire</span>
          <span className="weight-value">{100 - weight}%</span>
        </div>
      </div>
      
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={weight}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="weight-slider"
        />
        <div className="slider-track">
          <div 
            className="slider-fill"
            style={{ width: `${weight}%` }}
          ></div>
        </div>
      </div>
      
      <div className="slider-labels">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

// Results Component
const ModernResults = ({ scriptScores, questionnaireScores, combinedScores, mImages }) => {
  if (!scriptScores) return null;

  const chartColors = {
    script: {
      background: 'rgba(99, 102, 241, 0.8)',
      border: 'rgb(99, 102, 241)'
    },
    combined: {
      background: 'rgba(16, 185, 129, 0.8)',
      border: 'rgb(16, 185, 129)'
    }
  };

  const scriptBarData = {
    labels: Object.keys(scriptScores),
    datasets: [
      {
        label: 'Script Analysis',
        data: Object.values(scriptScores),
        backgroundColor: chartColors.script.background,
        borderColor: chartColors.script.border,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  const radarData = combinedScores ? {
    labels: Object.keys(combinedScores),
    datasets: [
      {
        label: 'Script Analysis',
        data: Object.keys(combinedScores).map(key => scriptScores[key] || 0),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)'
      },
      {
        label: 'Combined Analysis',
        data: Object.values(combinedScores),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)'
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="results-section">
      <div className="results-header">
        <BarChart3 className="results-icon" />
        <h2>Analysis Results</h2>
      </div>
      
      <div className="results-grid">
        <div className="chart-card">
          <h3>Script Analysis Overview</h3>
          <div className="chart-container">
            <Bar data={scriptBarData} options={chartOptions} />
          </div>
          <div className="scores-grid">
            {Object.entries(scriptScores).map(([pattern, score]) => (
              <div key={pattern} className="score-card">
                <span className="score-pattern">{pattern}</span>
                <span className="score-value">{score.toFixed(1)}%</span>
                <div className="score-bar">
                  <div 
                    className="score-fill"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {combinedScores && (
          <div className="chart-card">
            <h3>Comprehensive Analysis</h3>
            <div className="chart-container">
              <Radar data={radarData} options={radarOptions} />
            </div>
            <div className="scores-grid">
              {Object.entries(combinedScores).map(([pattern, score]) => (
                <div key={pattern} className="score-card combined">
                  <span className="score-pattern">{pattern}</span>
                  <span className="score-value">{score.toFixed(1)}%</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill combined"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {questionnaireScores && (
          <div className="questionnaire-results">
            <h3>Questionnaire Scores</h3>
            <div className="scores-grid">
              {Object.entries(questionnaireScores).map(([pattern, score]) => (
                <div key={pattern} className="score-card questionnaire">
                  <span className="score-pattern">{pattern}</span>
                  <span className="score-value">{score}%</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill questionnaire"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [scriptScores, setScriptScores] = useState(null);
  const [questionnaireScores, setQuestionnaireScores] = useState(null);
  const [combinedScores, setCombinedScores] = useState(null);
  const [mImages, setMImages] = useState(null);
  const [weight, setWeight] = useState(50);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleUploadSuccess = (data) => {
    setScriptScores(data.script_scores);
    setMImages(data.m_images);
    setQuestionnaireScores(null);
    setCombinedScores(null);
    setCurrentStep(2);
  };

  const handleQuestionnaireSubmit = async (scores) => {
    setQuestionnaireScores(scores);
    setIsAnalyzing(true);
    setCurrentStep(3);
    
    // Simulate analysis
    setTimeout(() => {
      const combined = {};
      Object.keys(scriptScores).forEach(key => {
        const scriptValue = scriptScores[key] || 0;
        const questionnaireValue = scores[key] || 0;
        combined[key] = (scriptValue * weight / 100) + (questionnaireValue * (100 - weight) / 100);
      });
      setCombinedScores(combined);
      setIsAnalyzing(false);
    }, 2000);

    // Uncomment for actual API call
    
    try {
      const response = await axios.post('http://localhost:5001/analyze', {
        script_scores: scriptScores,
        questionnaire_scores: scores,
        weight: weight
      });
      
      setCombinedScores(response.data.combined_scores);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
    
  };

  const handleWeightChange = (newWeight) => {
    setWeight(newWeight);
    if (questionnaireScores) {
      const combined = {};
      Object.keys(scriptScores).forEach(key => {
        const scriptValue = scriptScores[key] || 0;
        const questionnaireValue = questionnaireScores[key] || 0;
        combined[key] = (scriptValue * newWeight / 100) + (questionnaireValue * (100 - newWeight) / 100);
      });
      setCombinedScores(combined);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Handwriting Analysis</h1>
        <p className="dashboard-subtitle">Advanced AI-powered personality insights from handwriting patterns</p>
      </div>

      <div className="progress-indicator">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${scriptScores ? 'completed' : ''}`}>
          <Upload className="button-icon" />
          <span>Upload Sample</span>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${questionnaireScores ? 'completed' : ''}`}>
          <Settings className="button-icon" />
          <span>Questionnaire</span>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${combinedScores ? 'completed' : ''}`}>
          <BarChart3 className="button-icon" />
          <span>Analysis</span>
        </div>
      </div>

      <div className="main-content">
        <div className="input-section">
          <ModernFileUpload onUploadSuccess={handleUploadSuccess} />
          
          {scriptScores && (
            <>
              <ModernQuestionnaire onSubmit={handleQuestionnaireSubmit} />
              <ModernWeightSlider weight={weight} onChange={handleWeightChange} />
            </>
          )}
        </div>
        
        <ModernResults
          scriptScores={scriptScores}
          questionnaireScores={questionnaireScores}
          combinedScores={combinedScores}
          mImages={mImages}
        />
        
        {isAnalyzing && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <div>Analyzing handwriting patterns...</div>
              <div className="loading-subtitle">
                Processing psychological insights from your handwriting
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;