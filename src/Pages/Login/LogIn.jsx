import React, { useState } from 'react';
import Logo from '../../Shared/Logo/Logo';
 
import { TextField, Button, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from 'react-router';
const LogIn = () => {
    const [formData, setFormData] = useState({
        mobile: "",
        pin: "",
      });
      const [showPassword, setShowPassword] = useState(false);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
    
      const isPinValid = formData.pin.length === 5 && /^[0-9]+$/.test(formData.pin);
      const isFormValid = formData.mobile && isPinValid;
    
      const handleSubmit = () => {
        console.log("Login Data Submitted:", formData);
      };
    return (
        <div>
            <Logo title='Welcome'/>
            <div>
            <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <TextField
        fullWidth
        label="Mobile Number"
        variant="standard"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        fullWidth
        label="PIN (5-digit)"
        variant="standard"
        name="pin"
        type={showPassword ? "text" : "password"}
        value={formData.pin}
        onChange={handleChange}
        required
        error={!isPinValid && formData.pin.length > 0}
        helperText={!isPinValid && formData.pin.length > 0 ? "PIN must be exactly 5 digits" : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        Login
      </Button>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
            </div>
        </div>
    );
};

export default LogIn;