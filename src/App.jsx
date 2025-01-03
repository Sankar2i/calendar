import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminModule from "./components/AdminModule";
import UserModule from "./components/UserModule";
import Home from "./components/Home";
import CompanyForm from "./components/admin/CompanyForm";
// import Layout from "./components/layout/Layout";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-5">
        <h1 className="text-3xl font-bold mb-5 text-center text-green-600">
          Calendar Application
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminModule />} />
          <Route path="/admin/form" element={<CompanyForm />} />
          <Route path="/user" element={<UserModule />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
