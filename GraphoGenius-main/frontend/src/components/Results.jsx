import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Results = ({ scriptScores, questionnaireScores, combinedScores, mImages }) => {
  if (!scriptScores) return null;

  const scriptData = {
    labels: Object.keys(scriptScores),
    datasets: [
      {
        label: 'Script Analysis',
        data: Object.values(scriptScores),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  };

  const combinedData = {
    labels: Object.keys(combinedScores || {}),
    datasets: [
      {
        label: 'Combined Analysis',
        data: Object.values(combinedScores || {}),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  };

  return (
    <div className="results-container">
      <h2>Analysis Results</h2>
      
      <div className="result-section">
        <h3>Script Analysis Results</h3>
        <div className="chart-container">
          <Bar data={scriptData} />
        </div>
        <div className="scores-display">
          {Object.entries(scriptScores).map(([pattern, score]) => (
            <div key={pattern} className="score-item">
              <span className="pattern-name">{pattern}:</span>
              <span className="pattern-score">{score.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {questionnaireScores && (
        <div className="result-section">
          <h3>Questionnaire Scores</h3>
          <div className="scores-display">
            {Object.entries(questionnaireScores).map(([pattern, score]) => (
              <div key={pattern} className="score-item">
                <span className="pattern-name">{pattern}:</span>
                <span className="pattern-score">{score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {combinedScores && (
        <div className="result-section">
          <h3>Combined Analysis</h3>
          <div className="chart-container">
            <Bar data={combinedData} />
          </div>
          <div className="scores-display">
            {Object.entries(combinedScores).map(([pattern, score]) => (
              <div key={pattern} className="score-item">
                <span className="pattern-name">{pattern}:</span>
                <span className="pattern-score">{score.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {mImages && mImages.length > 0 && (
        <div className="m-images-preview">
          <h3>Extracted M Letters</h3>
          <div className="image-grid">
            {mImages.slice(0, 5).map((img, index) => (
              <div key={index} className="image-item">
                <img src={`http://localhost:5001/${img}`} alt={`M ${index + 1}`} />
                <p>M {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;