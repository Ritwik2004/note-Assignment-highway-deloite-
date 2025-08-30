import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import SignUp from "./pages/Signup.page.jsx";  // Your SignUp page
// import SignIn from "./pages/Signin.page.jsx"; // Your SignIn page
import SignUp from "./pages/Authentication.page.jsx"; // Your authentication page
import Dashboard from "./pages/Dashboard.page.jsx";
import {GoogleOAuthProvider} from '@react-oauth/google'
import { CreateNote } from "./pages/NoteCreation.page.jsx";

function App() {

  const googleAuthWrapper = ()=>{
    return (
      <GoogleOAuthProvider clientId="440964308806-v954gn8tg6bpnvdcrmesj3mf4vt8fmfq.apps.googleusercontent.com">
        <SignUp></SignUp>
      </GoogleOAuthProvider>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={googleAuthWrapper()} />
        <Route path="/noteCreation" element={<CreateNote />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        {/* Redirect base URL */}
        <Route
          path="/"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
