import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.components.jsx';
import { Mail, Eye } from 'lucide-react';

const SignIn = () => {

  const handleSignIn = (e) => {
    e.preventDefault();
    // TODO: Add API call to your backend to log the user in
    console.log('Signing in...');
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
        <p className="mt-2 text-gray-600">
          Please sign in to continue to your account.
        </p>

        <form onSubmit={handleSignIn} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
               <div className="relative mt-1">
                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="jonas_kahnwald@gmail.com"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                 <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Eye className="h-5 w-5 text-gray-400" />
                </span>
              </div>
            </div>
          </div>
          
          {/* TODO: Add Google Sign-in button here */}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Create now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
