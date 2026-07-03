'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation functions
  const validateFullName = (name: string): string => {
    if (!name.trim()) return 'Full name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    if (!email.endsWith('@gmail.com')) return 'Email must end with @gmail.com';
    const emailRegex = /^[a-zA-Z0-9._%-]+@gmail\.com$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePhoneNumber = (phone: string): string => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) return 'Invalid phone number format';
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) return 'Phone number must have at least 10 digits';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
    if (!hasNumbers) return 'Password must contain at least one number';
    if (!hasSpecialChar) return 'Password must contain at least one special character';

    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const nameError = validateFullName(formData.fullName);
    if (nameError) newErrors.fullName = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: '***',
      });
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Create Account
            </h1>
            <p className="text-slate-600">
              Join us today and get started
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-green-900 mb-2">
                Registration Successful!
              </h2>
              <p className="text-green-700">
                Your account has been created. Redirecting...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@gmail.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.phoneNumber
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-sm mt-1 font-medium">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 chars with mixed case, numbers & symbols"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none pr-12 ${
                      errors.password
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1 font-medium">{errors.password}</p>
                )}
                <p className="text-xs text-slate-500 mt-2">
                  Must contain uppercase, lowercase, numbers, and special characters
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1 font-medium">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-8"
              >
                Create Account
              </button>

              {/* Login Link */}
              <p className="text-center text-slate-600 text-sm">
                Already have an account?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign in
                </a>
              </p>
            </form>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-slate-700 bg-opacity-50 rounded-lg p-4 text-center text-slate-300 text-xs">
          🔒 Your information is secure and encrypted
        </div>
      </div>
    </div>
  );
}
