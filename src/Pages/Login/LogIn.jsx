import React, { useState } from 'react';
import Logo from '../../Shared/Logo/Logo';
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import 'sweetalert2/src/sweetalert2.scss'
import Swal from "sweetalert2";
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';


const LogIn = () => {
  const { signIN } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    pin: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isPinValid = formData.pin.length === 6 && /^[0-9]+$/.test(formData.pin);
  const isFormValid = formData.email && isPinValid;

  const handleSubmit = () => {
    console.log("Login Data Submitted:", formData);
    signIN(formData.email, formData.pin)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You log in success",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Please provide a registered email and password',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
  };

  return (
    <div>
      <Logo title='Welcome' />
      <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
        <TextField
          fullWidth
          label="Email"
          variant="standard"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          label="PIN (6-digit)"
          variant="standard"
          name="pin"
          type={showPassword ? "text" : "password"}
          value={formData.pin}
          onChange={handleChange}
          required
          error={!isPinValid && formData.pin.length > 0}
          helperText={!isPinValid && formData.pin.length > 0 ? "PIN must be exactly 6 digits" : ""}
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
  );
};

export default LogIn;
