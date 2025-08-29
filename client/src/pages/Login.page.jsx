import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.components.jsx';
import { Mail, Eye } from 'lucide-react';

const SignUp = () => {
  const [otpSent, setOtpSent] = useState(false);

  // Handler to request OTP from the backend
  const handleGetOtp = (e) => {
    e.preventDefault();
    // TODO: Add API call to your backend to send OTP
    console.log('Requesting OTP for the provided email...');
    setOtpSent(true); // Move this inside the .then() of your API call
  };

  // Handler to verify OTP and create the user
  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: Add API call to verify OTP and create the account
    console.log('Signing up with OTP...');
    // On success, you would typically redirect the user
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900">Sign up</h2>
        <p className="mt-2 text-gray-600">
          Sign up to enjoy the feature of HD
        </p>

        <form onSubmit={otpSent ? handleSignUp : handleGetOtp} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Jonas Khanwald"
                disabled={otpSent}
              />
            </div>
            <div>
              <label htmlFor="dob" className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="text" // Use 'date' for a date picker: type="date"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="11 December 1997"
                disabled={otpSent}
              />
            </div>
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
                  disabled={otpSent}
                />
              </div>
            </div>

            {otpSent && (
              <div className="relative">
                <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                  OTP
                </label>
                 <div className="relative mt-1">
                   <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 6-digit OTP"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Eye className="h-5 w-5 text-gray-400" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {otpSent ? 'Sign up' : 'Get OTP'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
