import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Student from './Components/Student';
import Professor from './Components/Professor';
import Registration from './Components/Registration';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/register" element={<Registration />} />
                
                {/* Protected Routes */}
                <Route 
                    path="/home" 
                    element={<ProtectedRoute element={<Home />} />} 
                />
                <Route 
                    path="/Student" 
                    element={<ProtectedRoute element={<Student />} />} 
                />
                <Route 
                    path="/Professor" 
                    element={<ProtectedRoute element={<Professor />} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
