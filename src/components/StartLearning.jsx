// src/components/StartLearning.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Paper,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from "@mui/material";
import { motion } from 'framer-motion';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import './StartLearning.css'; // Ensure you have corresponding CSS for styling

const StartLearning = () => {
  const { subjectName, chapterName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch questions based on subjectName and chapterName
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://jee-pyq1.onrender.com/${subjectName}/chapters/${chapterName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions.');
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subjectName, chapterName]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="h6">Loading questions...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container maxWidth="md">
        <Typography variant="h6">No questions available.</Typography>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      className="start-learning-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} className="question-paper" style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Chapter: {chapterName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="h5" style={{ margin: '20px 0' }}>
            {currentQuestion.question}
          </Typography>
          
          {/* Render Options if available */}
          {currentQuestion.options && currentQuestion.options.length > 0 && (
            <FormControl component="fieldset">
              <RadioGroup
                value={currentQuestion.selectedOption || ''}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[currentQuestionIndex].selectedOption = e.target.value;
                  setQuestions(updatedQuestions);
                }}
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
          )}

          {/* Show Correct Answer */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="body1" color="secondary" style={{ marginTop: '20px' }}>
                Correct Answer: {currentQuestion.correct_answer}
              </Typography>
              {currentQuestion.explanation && (
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                  Explanation: {currentQuestion.explanation}
                </Typography>
              )}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              startIcon={<PlayCircleOutlineIcon />}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowAnswer}
              startIcon={<PlayCircleOutlineIcon />}
            >
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              startIcon={<PlayCircleOutlineIcon />}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default StartLearning;
