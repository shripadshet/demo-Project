import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

const Registration = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userGroup: []
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error on input change
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!state.username) newErrors.username = 'Username is required';
    if (!state.email) newErrors.email = 'Email is required';
    if (state.email && !/\S+@\S+\.\S+/.test(state.email)) newErrors.email = 'Email is invalid';
    if (!state.password) newErrors.password = 'Password is required';
    if (!state.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (state.password !== state.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const newUser = { username: state.username, password: state.password };
      setState((prevState) => ({
        ...prevState,
        userGroup: [...prevState.userGroup, newUser],
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }));
      navigate("/", { replace: true, state: { userGroup: [...state.userGroup, newUser] } });
    } else {
      setErrors(formErrors);
    }
  };

  const handleBlur = (name) => {
    const validationErrors = validateForm();
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || ''
    }));
  };

  return (
    <>
      <h2>Register / Create new account</h2>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={state.username}
              onChange={handleChange}
              onBlur={() => handleBlur("username")}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur("confirmPassword")}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </>
  );
};

export default Registration;
