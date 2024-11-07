// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import { Email, Phone, Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              JEEscape - Your gateway to JEE success. We provide comprehensive resources and tutorials to help you excel in your JEE preparation.
            </Typography>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              <Email sx={{ verticalAlign: 'middle', mr: 1 }} /> contact@jeescape.com<br/>
              <Phone sx={{ verticalAlign: 'middle', mr: 1 }} /> +1 (234) 567-8901
            </Typography>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Typography variant="body2">
              <MuiLink component={RouterLink} to="/blog" color="inherit" underline="hover">
                Blog
              </MuiLink><br/>
              <MuiLink component={RouterLink} to="/faq" color="inherit" underline="hover">
                FAQ
              </MuiLink><br/>
              <MuiLink component={RouterLink} to="/support" color="inherit" underline="hover">
                Support
              </MuiLink>
            </Typography>
          </Grid>

          {/* Follow Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2">
              <MuiLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" color="inherit" sx={{ mr: 1 }}>
                <Facebook />
              </MuiLink>
              <MuiLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" color="inherit" sx={{ mr: 1 }}>
                <Twitter />
              </MuiLink>
              <MuiLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" color="inherit">
                <Instagram />
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            JEEscape {new Date().getFullYear()}
            {'. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;