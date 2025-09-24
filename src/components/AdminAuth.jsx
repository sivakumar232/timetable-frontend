import { Brain, Mail, Lock, Eye, EyeOff, Sun, Moon, ArrowLeft, Shield, KeyRound } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import React from "react";
// --- Login Page Component ---
const LoginPage = ({
  isDarkMode,
  formData,
  handleInputChange,
  handleSubmit,
  setCurrentPage,
  showPassword,
  setShowPassword,
}) => (
  <div className="min-h-screen flex">
    {/* Left Side - Form */}
    <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
 
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome Back
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 glow-input ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 glow-input ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
              />
              <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={() => setCurrentPage('forgotPassword')}
              className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 glow-button"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Image/Illustration */}
    <div className={`hidden lg:flex lg:w-1/2 items-center justify-center p-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-cyan-50 to-blue-100'}`}>
      <div className="text-center">
                 <div className="flex items-center justify-center mb-4">
            <Brain size={40} className="text-cyan-600 mr-3" />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              IntelliTime<span className="text-cyan-600">AI</span>
            </h1>
          </div>
        <div className={`w-64 h-64 mx-auto mb-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-white/50'}`}>
          <Brain size={120} className="text-cyan-600" />
        </div>
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Smart Scheduling Made Simple
        </h3>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Join thousands of institutions using IntelliTime AI to optimize their academic scheduling.
        </p>
      </div>
    </div>
  </div>
);

// --- Signup Page Component ---
const SignupPage = ({
  isDarkMode,
  formData,
  handleInputChange,
  handleSubmit,
  setCurrentPage,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => (
  <div className="min-h-screen flex">
    {/* Left Side - Image/Illustration */}
    <div className={`hidden lg:flex lg:w-1/2 items-center justify-center p-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-cyan-50 to-blue-100'}`}>
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
            <Brain size={40} className="text-cyan-600 mr-3" />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              IntelliTime<span className="text-cyan-600">AI</span>
            </h1>
          </div>
        <div className={`w-64 h-64 mx-auto mb-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-white/50'}`}>
          <Shield size={120} className="text-cyan-600" />
        </div>
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Enterprise-Grade Security
        </h3>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your data is protected with bank-level security and industry-standard encryption.
        </p>
      </div>
    </div>

    {/* Right Side - Form */}
    <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create Account
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of institutions optimizing their schedules
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 glow-input ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="john@university.edu"
                required
              />
            </div>
          </div>

          {/* Institution Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Institution Name
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 glow-input ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              placeholder="Your University Name"
              required
            />
          </div>

          {/* Role Selection */}
{/* Role Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ...`}
              required
            >
<option value="admin">Administrator</option>
  <option value="faculty">Faculty</option>
  <option value="student">Student</option> 

            </select>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 glow-input ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 glow-input ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500 mt-1"
              required
            />
            <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I agree to the{' '}
              <a href="#" className="text-cyan-600 hover:text-cyan-700 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-cyan-600 hover:text-cyan-700 transition-colors">
                Privacy Policy
              </a>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 glow-button"
          >
            Create Account
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-8">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Forgot Password Page Component ---
const ForgotPasswordPage = ({
  isDarkMode,
  formData,
  handleInputChange,
  handleSubmit,
  setCurrentPage,
}) => (
  <div className="min-h-screen flex">
    {/* Left Side - Form */}
    <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <KeyRound size={40} className="text-cyan-600 mr-3" />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Forgot Password
            </h1>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 glow-input ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 glow-button"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Sign In Link */}
        <div className="text-center mt-8">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Remembered your password?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Image/Illustration */}
    <div className={`hidden lg:flex lg:w-1/2 items-center justify-center p-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-cyan-50 to-blue-100'}`}>
      <div className="text-center">
        <div className={`w-64 h-64 mx-auto mb-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-white/50'}`}>
          <Shield size={120} className="text-cyan-600" />
        </div>
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Secure & Reliable
        </h3>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your account security is our top priority. Reset your password with confidence.
        </p>
      </div>
    </div>
  </div>
);


// --- Main App Component (Container) ---
function AdminAuth({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState('login'); // 'login', 'signup', 'forgotPassword'
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    role: 'admin'
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => { // Note: The function is now async
    e.preventDefault();
    
    // 1. Determine the correct API endpoint based on the current page
    const url = currentPage === 'login' 
        ? 'http://localhost:3001/api/login' 
        : 'http://localhost:3001/api/register';

    // This logic only applies to the login and signup forms
    if (currentPage === 'login' || currentPage === 'signup') {
        try {
            // 2. Send the form data to the server using fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert the form data to a JSON string
            });

            const data = await response.json();

            // 3. Handle errors from the server (e.g., wrong password, user exists)
            if (!response.ok) {
                alert(data.msg || 'An error occurred. Please try again.');
                return; // Stop the function if there was an error
            }
            
            // 4. SUCCESS: Save the JWT token from the server's response to localStorage
            localStorage.setItem('token', data.token);

            // 5. Update the app's state and navigate to the protected dashboard
            onLoginSuccess();
            navigate('/dashboard');

        } catch (error) {
            // This catches network errors (e.g., server is not running)
            console.error('Submission Error:', error);
            alert('Could not connect to the server. Please make sure it is running.');
        }
    } else if (currentPage === 'forgotPassword') {
        // This part remains the same for the forgot password functionality
        alert("A password reset link has been sent to your email (if the account exists).");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            isDarkMode={isDarkMode}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setCurrentPage={setCurrentPage}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        );
      case 'signup':
        return (
          <SignupPage
            isDarkMode={isDarkMode}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setCurrentPage={setCurrentPage}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordPage
            isDarkMode={isDarkMode}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return <LoginPage />;
    }
  };

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-lg transition-all hover:shadow-lg glow-card ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'}`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Back to Home Button */}
      <Link
        to="/"
        className={`fixed top-6 left-6 z-50 p-3 rounded-lg transition-all hover:shadow-lg glow-card ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'}`}
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Render Current Page */}
      {renderPage()}
    </div>
  );
}

export default AdminAuth;