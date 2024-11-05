// src/components/Home.jsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="home-content"
      >
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to JEEscape
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Your gateway to JEE success. Practice, learn, and excel in Physics, Chemistry, and Mathematics.
        </Typography>
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Home;