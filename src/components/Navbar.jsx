// src/components/Navbar.jsx
import React, { useState } from 'react'
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material'
import { motion } from 'framer-motion'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircle from '@mui/icons-material/AccountCircle'
import './Navbar.css'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if token exists in localStorage
    return !!localStorage.getItem('token')
  })

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    handleClose()
    // Redirect to home page
    window.location.href = '/'
  }

  // src/components/Navbar.jsx
// ... existing imports ..
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className="navbar-container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JEEscape
          </Typography>
        </motion.div>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <Button color="inherit" startIcon={<HomeIcon />} href="/">
              Home
            </Button>
            {isAuthenticated && (
              <>
                <Button color="inherit" startIcon={<SettingsIcon />} href="/dashboard">
                  Dashboard
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMenu}
                  sx={{ ml: 2 }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Button href="/profile" color="inherit">
                      Profile
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
            {!isAuthenticated && (
              <Button color="inherit" variant="outlined" sx={{ ml: 2 }} href="/login">
                Login
              </Button>
            )}
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};



export default Navbar;