// SubjectDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SubjectDashboard = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [error, setError] = useState(null);
  const { subjectName } = useParams();

  // Fetch chapters on component mount
  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5011/${subjectName}/chapters`);
        setChapters(response.data.chapters);
        console.log(response.data.chapters);
      } catch (error) {
        setError('Failed to fetch chapters.');
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, [subjectName]);

  // Fetch questions for a specific chapter (optional)
  const fetchQuestions = async (chapterId) => {
    setQuestionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5010/${subjectName}/chapters/${chapterId}/questions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle questions data
    } catch (error) {
      setError('Failed to fetch questions.');
    } finally {
      setQuestionLoading(false);
    }
  };

  return (
    <div>
      <h1>{subjectName} Dashboard</h1>
      {loading ? (
        <p>Loading Chapters...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              {chapter.title}
              {/* You can add more details or buttons to fetch questions */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectDashboard;