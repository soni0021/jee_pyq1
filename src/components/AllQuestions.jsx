import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import './AllQuestions.css';

const AllQuestions = () => {
  const { subjectName, chapterName } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5011/${subjectName}/chapters/${chapterName}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch questions.');
        setLoading(false);
      }
    };
    fetchAllQuestions();
  }, [subjectName, chapterName]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSolveQuestion = () => {
    // Mark the current question as done
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].isDone = true;
    setQuestions(updatedQuestions);
    
    // Navigate to the next question or a confirmation page
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If all questions are done, navigate to a completion page or show a message
     
    }
  };

  if (loading) {
    return (
      <Container className="loading-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="loading-motion"
        >
          <Typography variant="h5" align="center" gutterBottom>
            Loading Questions...
          </Typography>
          <LinearProgress color="primary" />
        </motion.div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="error-container">
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      className="all-questions-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center" className="questions-title">
          {chapterName.charAt(0).toUpperCase() + chapterName.slice(1)} - Question {currentQuestionIndex + 1}
        </Typography>
        
        <Paper elevation={3} className="question-paper p-6">
          <Typography variant="h6" gutterBottom>
            {currentQuestion?.question}
          </Typography>

          <FormControl component="fieldset" className="mt-4">
            <RadioGroup>
              {currentQuestion?.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={`${String.fromCharCode(65 + idx)}. ${option}`}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box className="mt-6 flex justify-between items-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSolveQuestion}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </Box>
          
          <Typography variant="body2" align="center" className="mt-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default AllQuestions;