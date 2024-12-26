// src/components/SubjectDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Grid,
  Container,
  LinearProgress,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { motion } from 'framer-motion';
import axios from 'axios';
import './SubjectDashboard.css'; // Ensure you have corresponding CSS for styling

const SubjectDashboard = () => {
  const { subjectName } = useParams(); // Extract subjectName from URL
  const [chapters, setChapters] = useState([]);
  const [bookmarkedChapters, setBookmarkedChapters] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchChapters = async () => {
      if (!subjectName) {
        console.error('Subject name is undefined.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token'); // If authentication is required
        const response = await axios.get(`https://jee-pyq1.onrender.com/${subjectName}/chapters`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChapters(response.data);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      } finally {
        setLoading(false); // Stop loading irrespective of success or failure
      }
    };

    fetchChapters();
  }, [subjectName]);

  const toggleBookmark = (chapterName) => {
    setBookmarkedChapters((prev) =>
      prev.includes(chapterName)
        ? prev.filter((name) => name !== chapterName)
        : [...prev, chapterName]
    );
  };

  if (loading) {
    return (
      <motion.div
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Loading Chapters...
        </Typography>
        <LinearProgress color="primary" />
      </motion.div>
    );
  }

  if (chapters.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          No Chapters Available.
        </Typography>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Grid container spacing={3}>
          {chapters.map((chapter, index) => (
            <Grid item xs={12} sm={6} md={4} key={chapter._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="chapter-card-wrapper"
              >
                <Card className="chapter-card">
                  
                  <CardContent>
                    <div className="chapter-header">
                      <Typography variant="h6" className="chapter-title">
                        {chapter.chapter}
                      </Typography>
                      <Tooltip
                        title={
                          bookmarkedChapters.includes(chapter.chapter)
                            ? 'Remove Bookmark'
                            : 'Bookmark Chapter'
                        }
                        arrow
                        placement="top"
                      >
                        <IconButton
                          onClick={() => toggleBookmark(chapter.chapter)}
                          className="bookmark-button"
                          color="primary"
                        >
                          {bookmarkedChapters.includes(chapter.chapter) ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="chapter-actions">
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/subject/${subjectName}/chapter/${chapter.chapter.toLowerCase()}`}
                        className="view-button"
                        startIcon={<PlayCircleOutlineIcon />}
                      >
                        Give Quiz
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={`/subject/${subjectName}/chapter/${chapter.chapter.toLowerCase()}/start-learning`}
                        className="view-button"
                        startIcon={<MenuBookIcon />}
                      >
                        Start Learning
                      </Button>
                      <Chip
                        label={`${chapter.questions?.length || 0} Questions`}
                        color="secondary"
                        size="small"
                        className="questions-chip"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
};

export default SubjectDashboard;
