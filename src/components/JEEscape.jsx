import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Science, Functions } from '@mui/icons-material';
import * as THREE from 'three';
import './JEEscape.css';


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
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  
  const handleQAClick = () => {
    // Redirect to the Streamlit app route
    window.location.href = 'http://localhost:8501'; // Replace with your Streamlit app URL
  };
  
  const handleToggleRotation = () => {
    setIsRotating(!isRotating);
  };
  
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  
  const handleClick = (e) => {
    const newRipple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };
  
  useEffect(() => {
    // Scene Setup
    const scene = new THREE.Scene();
  
    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      5000
    );
    camera.position.z = 100;
  
    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
  
    // Galaxy Parameters
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 5000; // Reduced count for performance
    const positions = [];
  
    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      positions.push(x, y, z);
    }
  
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3, // Increased size for bigger dots
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9 // Increased opacity for better visibility
    });
  
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
  
    // Animation Function
    const animate = () => {
      if (isRotating) {
        starField.rotation.y += 0.005; // Increased rotation speed
        starField.rotation.x += 0.002; // Increased rotation speed
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  
    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
  
    // Cleanup on Unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, [isRotating]);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [ripples]);
  
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prevRipples) => prevRipples.slice(1));
      }, 600); // Duration of the ripple animation
      return () => clearTimeout(timer);
    }
  }, [ripples]);
  return (
    <Box
    className="jeescape-container"
    sx={{ 
      py: 12,
      backgroundColor: '#1a1a2e',
      backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
      // Removed cursor: 'none'
    }}
  >
    <div ref={mountRef} className="three-container" />
    <Container maxWidth="lg" className="content-overlay">
      <Typography
        variant="h1"
        align="center"
        sx={{ 
          mb: 8,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          fontSize: { xs: '3rem', md: '4.5rem' },
          position: 'relative',
          zIndex: 2
        }}
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
       {/* Buttons Overlay */}
       <Box sx={{ textAlign: 'center', mt: 6, position: 'relative', zIndex: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleQAClick}
          sx={{
            mt: 4,
            backgroundColor: '#6366F1',
            '&:hover': {
              backgroundColor: '#4F46E5'
            }
          }}
        >
          Solve Doubt with AI
        </Button>
      </Box>
    </Container>
  </Box>
  );
};

export default JEEscape;
