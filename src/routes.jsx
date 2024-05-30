import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/registerForm"
import LoginForm from "./pages/loginForm";
import AdveritsmentForm from "./pages/adveritsmentForm";
import AdminDashboard from './pages/Admin/AdminDashboard';
import Header from "./components/Header";
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/ads" element={<AdveritsmentForm />} />


          <Route path="/admin" element={<AdminDashboard />} />


        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
