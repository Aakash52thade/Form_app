import React, { useState } from 'react'
import './App.css'

const App = () => {
  // State for form field values
  const [fields, setFields] = useState({
    email: "", 
    password: "", 
    confirm_password: ""
  })

  // State for tracking errors for each field
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm_password: ""
  })

  // State for tracking if fields have been touched (user has interacted with them)
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirm_password: false
  })

  // Email validation function - checks for valid email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Password validation function - checks if at least 8 characters
  const validatePassword = (password) => {
    return password.length >= 8
  }

  // Confirm password validation - checks if it matches password
  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword && confirmPassword !== ""
  }

  // Handle input changes and validate in real-time
  const handleInput = (e) => {
    const {name, value} = e.target
    
    // Update field value
    setFields({...fields, [name]: value})

    // Mark field as touched
    setTouched({...touched, [name]: true})

    // Validate based on field name and update errors
    let errorMessage = ""

    if (name === "email") {
      if (!validateEmail(value)) {
        errorMessage = "Please enter a valid email address"
      }
    } else if (name === "password") {
      if (!validatePassword(value)) {
        errorMessage = "Password must be at least 8 characters long"
      }
    } else if (name === "confirm_password") {
      if (!validateConfirmPassword(fields.password, value)) {
        errorMessage = "Passwords do not match"
      }
    }

    setErrors({...errors, [name]: errorMessage})
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
      confirm_password: true
    })

    // Validate all fields
    const isEmailValid = validateEmail(fields.email)
    const isPasswordValid = validatePassword(fields.password)
    const isConfirmPasswordValid = validateConfirmPassword(fields.password, fields.confirm_password)

    // Check if all fields are valid
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      alert("Form submitted successfully")
      // Reset form after successful submission
      setFields({email: "", password: "", confirm_password: ""})
      setErrors({email: "", password: "", confirm_password: ""})
      setTouched({email: false, password: false, confirm_password: false})
    } else {
      alert("Can't submit the form")
      
      // Update errors for all invalid fields
      const newErrors = {
        email: isEmailValid ? "" : "Please enter a valid email address",
        password: isPasswordValid ? "" : "Password must be at least 8 characters long",
        confirm_password: isConfirmPasswordValid ? "" : "Passwords do not match"
      }
      setErrors(newErrors)
    }
  }

  // Determine email border color based on validation
  const getEmailBorderColor = () => {
    if (!touched.email) return ""
    if (errors.email) return "input-error"
    if (validateEmail(fields.email)) return "input-success"
    return ""
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="form-title">Sign Up</h1>
        <p className="form-subtitle">Create your account</p>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input 
              type='email'
              required
              name='email'
              id='email'
              placeholder="Enter your email"
              value={fields.email}
              onChange={handleInput}
              className={getEmailBorderColor()}
            />
            {touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input 
              type='password'
              required
              id='password'
              name='password'
              placeholder="Enter your password"
              value={fields.password}
              onChange={handleInput}
            />
            {touched.password && errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input 
              type='password'
              required
              id='confirm_password'
              name='confirm_password'
              placeholder="Confirm your password"
              value={fields.confirm_password}
              onChange={handleInput}
            />
            {touched.confirm_password && errors.confirm_password && (
              <span className="error-message">{errors.confirm_password}</span>
            )}
          </div>

          <button type='submit' className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default App







//cheat code
// useState for store fields;
//usestate fro tracking error first it's will empty;
//state fro tracking fields are touched or not;
// //email validation with regex
// const ValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   return regexEmail.test(email)
// }

//password Validation
// const validatePassword = (password) => {
//   return password.length >= 8;
// }

//   // Confirm password validation - checks if it matches password
// const isConfirmPasswordValid = (password, confirmPassword) => {
//   return password === confirmPassword && confirmPassword !== ""
// }

// const handleInput = (e) => {
//   const {name, value} = e.target;

//   setFields({...fields, [name]: value});
//   setTouched(...touched, [name]:true);

//   let errorMessage ="";
//   if(name === 'email'){
//     if(!validateEmail(value)){
//       errorMessage
//     }
//   }else if(name === "password"){
//     if(!validatePassword(value)){
//       errorMessage
//     }
//   }else if(name === "confirm_password"){
//     if(!validateConfirmPassword(fields.password, value))
//       errorMessage
//   }
//   setErrors({...errors, [name]:errorMessage})
// }

// const handleSubmit = (e) => {
//   e.preventDefault();
//   setTouched({
//     email: true,
//   })

//   const isEmailValid = validateEmail(fields.email);
//   const isPasswordValid = validatePassword(fields.password)
// }
// // if all the fields are ok then show success meassage and empty and reset
// //all the states;
