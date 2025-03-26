import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn, Loader2, AlertTriangle, Server } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [backendStatus, setBackendStatus] = useState({
    checking: true,
    isReady: false,
    message: "Checking backend status..."
  });

  // Function to check backend status
  const checkBackendStatus = async () => {
    try {
      setBackendStatus(prev => ({ ...prev, checking: true }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 1000); 

      const response = await fetch(
        "https://retail-admin-panel.onrender.com/api/clients",
        {
          method: "GET",
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        setBackendStatus({
          checking: false,
          isReady: true,
          message: "Backend is ready!"
        });
      } else {
        setBackendStatus({
          checking: false,
          isReady: false,
          message: "Backend is not fully ready. Please wait."
        });
      }
    } catch (err) {
      setBackendStatus({
        checking: false,
        isReady: false,
        message: err.name === 'AbortError' 
          ? "Backend taking too long to respond. Please wait." 
          : "Backend is not available. Please try again later."
      });
    }
  };

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    // Check backend status before attempting login
    if (!backendStatus.isReady) {
      setError("Backend is not ready. Please wait.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://retail-admin-panel.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Successful login
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        // Handle login error
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Network error or other issues
      setError("An error occurred. Please try again. " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to Admin Dashboard
          </h2>
          
          {/* Backend Status Alert */}
          <div className={`mt-4 p-4 rounded-md text-center flex items-center justify-center ${
            backendStatus.checking 
              ? "bg-yellow-100 text-yellow-700" 
              : backendStatus.isReady 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
          }`}>
            <Server className="mr-2 h-6 w-6" />
            <span>{backendStatus.message}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !backendStatus.isReady}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                (loading || !backendStatus.isReady)
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign in
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;