import React, { useState } from 'react';
import { TextField, Button, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router';
import Logo from '../../Shared/Logo/Logo';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import useAuth from '../../Hooks/useAuth';
const Register = () => {
  const {createUser,signOut} = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        pin: '',
        mobile: '',
        email: "",
        accountType: "user",
        nid: "",
        amount: 40,
        verification: false,
      });
      const axiosPublic = useAxiosPublic();
      const navigate = useNavigate()
      const [showPin, setShowPin] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "accountType") {
          setFormData({ ...formData, accountType: value, amount: value === "agent" ? 100000 : 40 });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleTogglePin = () => {
        setShowPin(!showPin);
      };
    
      const isPinValid = formData.pin.length === 6 && /^[0-9]+$/.test(formData.pin);
      const isNidValid = formData.nid.length >= 10 && formData.nid.length <= 17 && /^[0-9]+$/.test(formData.nid);
      const isFormValid = formData.name && formData.mobile && formData.email && isPinValid && isNidValid;

    
      const handleSubmit = async () => {
        console.log("Registration Data Submitted:", formData);
        try {
          // Send form data to the backend
          const res = await axiosPublic.post('/users', formData);
      
          if (res.data.insertedId) {
            try {
              // Create user with Firebase authentication
              const result = await createUser(formData.email, formData.pin);
      
              if (result?.user) {
                // Show success message
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registered Successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
                signOut()
                // Navigate to home page
                navigate('/');
              } else {
                throw new Error("User creation failed in Firebase.");
              }
            } catch (firebaseError) {
              Swal.fire({
                icon: "error",
                title: "Firebase Registration Failed",
                text: firebaseError.message || "Something went wrong!",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
              text: res.data.message || "Something went wrong!",
            });
          }
        } catch (axiosError) {
          Swal.fire({
            icon: "error",
            title: "Server Request Failed",
            text: axiosError.message || "Failed to register user.",
          });
        }
      

      };
    return (
        <div>
            <div>
                <Logo title='Register'/>
            </div>
            <div>
            <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <TextField fullWidth label="Name" variant="standard" name="name" value={formData.name} onChange={handleChange} required style={{ marginBottom: "10px" }} />
      <TextField fullWidth label="Mobile Number" variant="standard" name="mobile" value={formData.mobile} onChange={handleChange} required style={{ marginBottom: "10px" }} />
      <TextField fullWidth label="Email" variant="standard" name="email"  value={formData.email.toLowerCase()} onChange={handleChange} required style={{ marginBottom: "10px" }} />
      <TextField
        fullWidth
        label="PIN (6-digit)"
        variant="standard"
        name="pin"
        type={showPin ? "text" : "password"}
        value={formData.pin}
        onChange={handleChange}
        required
        error={!isPinValid && formData.pin.length > 0}
        helperText={!isPinValid && formData.pin.length > 0 ? "PIN must be exactly 6 digits" : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePin}>
                {showPin ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "10px" }}
      />
      <TextField select fullWidth label="Account Type" variant="standard" name="accountType" value={formData.accountType} onChange={handleChange} required style={{ marginBottom: "10px" }}>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="agent">Agent</MenuItem>
      </TextField>
      <TextField fullWidth label="NID" variant="standard" name="nid" value={formData.nid} onChange={handleChange} required error={!isNidValid && formData.nid.length > 0} helperText={!isNidValid && formData.nid.length > 0 ? "NID must be 10-17 digits" : ""} style={{ marginBottom: "10px" }} />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={!isFormValid}>Register</Button>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
            </div>
        </div>
    );
};

export default Register;