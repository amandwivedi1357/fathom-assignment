import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Anchor, AlertCircle } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signup(name, email, password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Failed to create account');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-marine-dark to-marine-medium px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-marine-light">
            <Anchor className="h-8 w-8 text-marine-dark" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join Maritime Operations platform
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="ml-2 text-sm font-medium text-red-800">{error}</span>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-marine-medium focus:ring-marine-medium sm:text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-marine-medium focus:ring-marine-medium sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-marine-medium focus:ring-marine-medium sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-marine-medium focus:ring-marine-medium sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-marine-medium px-3 py-3 text-sm font-semibold text-white hover:bg-marine-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marine-medium"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>

          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-marine-medium hover:text-marine-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;