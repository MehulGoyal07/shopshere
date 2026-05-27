// Common validation patterns
const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const blockedDomains = ["tempmail.com", "mailinator.com", "guerrillamail.com"];

// Validation functions
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  const domain = email.split("@")[1];
  if (blockedDomains.includes(domain)) return "Please use a valid email address";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!strongPasswordRegex.test(password)) return "Password must contain uppercase, lowercase, and number";
  return "";
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) return "Please confirm your password";
  if (confirmPassword !== password) return "Passwords do not match";
  return "";
};

export const validateFullName = (fullName) => {
  const trimmed = fullName?.trim();
  if (!trimmed || trimmed.length < 6) return "Name must be at least 6 characters";
  if (trimmed.length > 20) return "Name must be less than 20 characters";
  if (!nameRegex.test(trimmed)) return "Name can only contain letters and spaces";
  return "";
};

export const validateUsername = (username) => {
  const trimmed = username?.trim();
  if (!trimmed || trimmed.length < 4) return "Username must be at least 4 characters";
  if (trimmed.length > 20) return "Username must be less than 20 characters";
  if (!usernameRegex.test(trimmed)) return "Username can only contain letters, numbers, and underscore";
  return "";
};

export const validateLogin = (email, password) => {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  return {
    email: emailError,
    password: passwordError,
    isValid: !emailError && !passwordError,
  };
};

export const validateSignup = (fullName, username, email, password, confirmPassword) => {
  const fullNameError = validateFullName(fullName);
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

  return {
    fullName: fullNameError,
    username: usernameError,
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
    isValid: !fullNameError && !usernameError && !emailError && !passwordError && !confirmPasswordError,
  };
};

// Utility function to validate all fields at once
export const validateAllFields = (fields, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach((field) => {
    const error = validationRules[field](fields[field], fields);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};
