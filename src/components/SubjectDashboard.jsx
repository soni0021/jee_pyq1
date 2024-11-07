// src/components/SubjectDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './SubjectDashboard.css';

const SubjectDashboard = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedChapters, setBookmarkedChapters] = useState([]);
  const [progress, setProgress] = useState({});
  const { subjectName } = useParams();

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedChapters') || '[]');
    const savedProgress = JSON.parse(localStorage.getItem('chapterProgress') || '{}');
    setBookmarkedChapters(savedBookmarks);
    setProgress(savedProgress);
    fetchChapters();
  }, [subjectName]);

  const fetchChapters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5011/${subjectName}/chapters`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChapters(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch chapters.');
      setLoading(false);
    }
  };

  const toggleBookmark = (chapterName) => {
    const updatedBookmarks = bookmarkedChapters.includes(chapterName)
      ? bookmarkedChapters.filter(name => name !== chapterName)
      : [...bookmarkedChapters, chapterName];
    setBookmarkedChapters(updatedBookmarks);
    localStorage.setItem('bookmarkedChapters', JSON.stringify(updatedBookmarks));
  };

  const updateProgress = (chapterName, value) => {
    const updatedProgress = { ...progress, [chapterName]: value };
    setProgress(updatedProgress);
    localStorage.setItem('chapterProgress', JSON.stringify(updatedProgress));
  };

  if (loading) {
    return (
      <Container className="loading-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Loading Chapters...
          </Typography>
          <LinearProgress color="primary" />
        </motion.div>
      </Container>
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
        <Typography variant="h4" gutterBottom align="center" className="dashboard-title">
          {subjectName.charAt(0).toUpperCase() + subjectName.slice(1)} Dashboard
        </Typography>
        
        <Grid container spacing={4}>
          <AnimatePresence>
            {chapters.map((chapter, index) => (
              <Grid item xs={12} sm={6} md={4} key={chapter._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="chapter-card-wrapper"
                >
                  <Card className="chapter-card">
                    <CardMedia
                      component="img"
                      height="140"
                      image={chapter.image || `/subjects/${subjectName}/${chapter.chapter.toLowerCase()}.jpg`}
                      alt={chapter.chapter}
                      className="chapter-image"
                    />
                    <CardContent>
                      <div className="chapter-header">
                        <Typography variant="h6" className="chapter-title">
                          {chapter.chapter}
                        </Typography>
                        <Tooltip title={bookmarkedChapters.includes(chapter.chapter) ? "Remove Bookmark" : "Bookmark Chapter"}>
                          <IconButton
                            onClick={() => toggleBookmark(chapter.chapter)}
                            className="bookmark-button"
                          >
                            {bookmarkedChapters.includes(chapter.chapter) ? (
                              <BookmarkIcon color="primary" />
                            ) : (
                              <BookmarkBorderIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>

                      <div className="progress-section">
                        <Typography variant="body2" color="textSecondary">
                          Progress: {progress[chapter.chapter] || 0}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={progress[chapter.chapter] || 0}
                          className="progress-bar"
                        />
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
          </AnimatePresence>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default SubjectDashboard;