import React, { useState } from 'react';
import './Login.css'; 
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const location = useLocation();

    const validateEmail = (username) => {
        if (!username.trim()) {
            return 'username is required';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (!password.trim()) {
            return 'Password is required';
        } 
        return '';
    };

    const handleBlur = (name) => {
        let validationError = '';
        if (name === 'username') {
            validationError = validateEmail(username);
        } else if (name === 'password') {
            validationError = validatePassword(password);
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationError,
        }));
    };

    const handleChange = (event, name) => {
        if (name === 'username') {
            setUsername(event.target.value);
        } else if (name === 'password') {
            setPassword(event.target.value);
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear the error for the current field
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const usernameError = validateEmail(username);
        const passwordError = validatePassword(password);

        if (usernameError || passwordError) {
            setErrors({ username: usernameError, password: passwordError });
            return; // Prevent submission if there are validation errors
        }

        if (username === 'shripad' && password === '12345') {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            navigate('/home');
        } else if (location.state?.userGroup?.[0]?.username === username && location.state?.userGroup?.[0]?.password === password) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            navigate('/home');
        } else {
            alert('Invalid username or password');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="container">
            <div className="slider left"></div>
            <div className="slider right"></div>
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        onChange={(e) => handleChange(e, "username")}
                        onBlur={() => handleBlur("username")}
                    />
                    {errors.username && <span className="error" style={{ fontSize: "15px", color: "red" }}>{errors.username}</span>}
                    
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => handleChange(e, "password")}
                        onBlur={() => handleBlur("password")}
                    />
                    {errors.password && <span className="error" style={{ fontSize: "15px", color: "red" }}>{errors.password}</span>}
                    
                    <button type="submit">Login</button>
                    <div style={{ textAlign: 'center', marginTop: 20 }}>Don't have an account?</div>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            className="btn btn-primary register-btn"
                            onClick={handleRegisterClick}
                        >
                            Register Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
