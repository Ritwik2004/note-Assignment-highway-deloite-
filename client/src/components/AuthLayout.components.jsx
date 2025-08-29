import authImage from '../assets/auth-image.svg'; // Make sure to place the image here
import { Sun } from 'lucide-react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl flex bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col">
          <header className="mb-8">
            <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <Sun className="text-blue-600" /> HD
            </h1>
          </header>
          <main className="flex-grow flex flex-col justify-center">
            {children}
          </main>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={authImage}
            alt="Abstract blue waves"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
