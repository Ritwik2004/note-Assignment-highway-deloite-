import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/Login.page.jsx';
import SignIn from './pages/Register.page.jsx';
import Dashboard from './pages/Dashboard.page.jsx';

// A simple component to protect routes
const PrivateRoute = ({ children }) => {
  // TODO: Replace this with your actual authentication check
  // e.g., check if a JWT exists in localStorage
  const isAuthenticated = true; 
  return isAuthenticated ? children : <Navigate to="/signin" />;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        {/* Redirect base URL to the dashboard */}
        <Route 
          path="/" 
          element={<Navigate to="/dashboard" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
