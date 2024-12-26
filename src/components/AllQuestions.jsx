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
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://jee-pyq1.onrender.com/${subjectName}/chapters/${chapterName}`,
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

  const handleOptionChange = (e) => {
    const updatedSelections = {
      ...selectedOptions,
      [currentQuestionIndex]: e.target.value,
    };
    setSelectedOptions(updatedSelections);
  };
  
  const handleSubmitAnswer = () => {
    const selected = selectedOptions[currentQuestionIndex];
    const correct = currentQuestion.correct_answer;
    if (selected === correct) {
      setScore(score + 1);
    }
    // Mark question as done and show correct answer
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].isDone = true;
    updatedQuestions[currentQuestionIndex].isCorrect = selected === correct;
    setQuestions(updatedQuestions);
  
    // Navigate to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
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
      {showResults ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Quiz Completed!
          </Typography>
          <Typography variant="h6">
            Your Score: {score} / {questions.length}
          </Typography>
          <Typography variant="h6">
            Accuracy: {((score / questions.length) * 100).toFixed(2)}%
          </Typography>
        </div>
      ) : (
        <Paper elevation="3" className="question-paper">
          <Typography variant="h5">
            {currentQuestion.question}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedOptions[currentQuestionIndex] || ''}
              onChange={handleOptionChange}
            >
              {currentQuestion.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {questions[currentQuestionIndex].isDone && (
            <Typography variant="body1" color="secondary">
              Correct Answer: {currentQuestion.correct_answer}
            </Typography>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitAnswer}
              disabled={questions[currentQuestionIndex].isDone}
            >
              Submit
            </Button>
               
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  </motion.div>
);
}
export default AllQuestions;
