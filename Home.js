import React from 'react';
import './Home.css'; // Import CSS for styling
import PieChart from './PieChart';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
    const totalStudents = 300;
    const totalProfessors = 50;

    const navigate =useNavigate();
    
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                <Outlet />
                    <h2>Dashboard</h2>
                    <p>Welcome to your dashboard!</p>
                    <div className="buttons-container">
                   </div>
                    <PieChart students={totalStudents} professors={totalProfessors} />
                    {/* Add more dashboard widgets or components here */}
                </div>
            </div>
        </div>
    );
};

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/student">Add Student</a></li>
                <li><a href="/professor">Add Professor</a></li>
            </ul>
        </div>
    );
};

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className='header'>
        <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px',borderBottom:"1px solid #fff" }}>
            <Typography variant="h4">Dashboard Header</Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLogout}
                style={{ alignSelf: 'flex-end' }}
                   >
                <LogoutIcon/>
                Logout
            </Button>
        </Container>
        </div>
    );
};

export default Home;
