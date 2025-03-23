import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '.components/Navbar';
import BlogList from '.componments/BlogList';
import BlogDetail from '.components/BlogDetail';
import Login from '.components/Login';
import Register from '.components/Register';

const App = () => {
    return (
        <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<BlogList />} />
                    <Route path="/blogs:/blogId" element={<BlogDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
        </Router>
    );
};

export default App;