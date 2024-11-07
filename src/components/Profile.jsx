// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Avatar,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    // Add other user fields as needed
  });

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/index/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        setFormData({
          username: res.data.user.username,
          // Initialize other fields
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchUser();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/index/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!user) {
    return (
      <Container className="profile-container">
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="profile-card">
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              alt={user.username}
              src={user.avatarUrl}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            {editMode ? (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                {/* Add other editable fields here */}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ mr: 2 }}
                  >
                    Save
                  </Button>
                  <Button variant="outlined" onClick={handleEditToggle}>
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5">{user.username}</Typography>
                {/* Display other user information here */}
                <Box mt={2}>
                  <Button variant="contained" onClick={handleEditToggle}>
                    Edit Profile
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;