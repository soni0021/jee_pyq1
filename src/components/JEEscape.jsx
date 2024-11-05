// src/components/JEEscape.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';
import {
  Science,
  Functions
} from '@mui/icons-material';
import "./JEEscape.css";

const subjects = [
  {
    title: 'Physics',
    icon: <Science sx={{ fontSize: 40 }}/>,
    description: 'Master key physics concepts and solve problems effectively',
    color: '#FF6B6B'
  },
  {
    title: 'Chemistry',
    icon: <Science sx={{ fontSize: 40 }}/>, // Using Science as a placeholder
    description: 'Understand chemical reactions and molecular structures',
    color: '#4ECDC4'
  },
  {
    title: 'Mathematics',
    icon: <Functions sx={{ fontSize: 40 }}/>,
    description: 'Enhance your problem-solving skills in mathematics',
    color: '#45B7D1'
  }
];

const JEEscape = () => {
  return (
    <Box className="jeescape-container" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 'bold', color: '#FFFFFF' }}
        >
          Welcome to JEEscape
        </Typography>
        
        <Grid container spacing={4}>
          {subjects.map((subject, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                className="subject-card"
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  }
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: subject.color,
                    color: 'white'
                  }}
                >
                  {subject.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#FFFFFF' }}>
                    {subject.title}
                  </Typography>
                  <Typography sx={{ color: '#CBD5E1' }}>
                    {subject.description}
                  </Typography>
                  <Button 
                      variant="contained" 
                      component={Link}
                      to={`/subject/${subject.title.toLowerCase()}`} // Dynamic route based on subject
                      sx={{ 
                        mt: 2,
                        backgroundColor: subject.color,
                        '&:hover': {
                          backgroundColor: subject.color,
                          opacity: 0.9
                        }
                      }}
                    >
                      Explore
                    </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default JEEscape;
