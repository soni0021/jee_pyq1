// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JEEscape from './components/JEEscape';
import Footer from './components/Footer';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import SubjectDashboard from './components/SubjectDashboard';
import Hii from "./components/Hii";
import AllQuestions from './components/AllQuestions';
const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <JEEscape />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/subject/:subjectName"
                     element={
                          <ProtectedRoute>
                           <SubjectDashboard />
                              </ProtectedRoute>
                             }
/>                 
                         <Route
                   path="/subject/:subjectName/chapter/:chapterName"
                    element={
                     <ProtectedRoute>
                       <AllQuestions />
                      </ProtectedRoute>
                         }
/>
           
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;