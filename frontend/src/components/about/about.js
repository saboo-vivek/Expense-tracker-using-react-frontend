import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Spinner, Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { Cart3, BoxArrowRight } from 'react-bootstrap-icons';
import axios from 'axios';
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";
import './about.css'
export default function About() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div className='aboutdiv'>
            <div className='navbodya'>
                <Navbar bg="dark" data-bs-theme="dark">

                    <Container>
                    <Nav className="me-auto navlinks">
                                <NavLink to="/home" className='curr'>Home</NavLink>
                                <NavLink to="/about" className='curr'>About Us</NavLink>
                                <NavLink to="/contact" className='curr'>Contact Us</NavLink>
                                <NavLink className='logoutbtn' onClick={handleLogout}>
                                    <IoLogOutOutline /> Logout
                                </NavLink>

                            </Nav>
                    </Container>
                </Navbar>
                <p className='pclass'>
                    Welcome to our company!<br></br>
                    Our mission is to provide high-quality services to our customers.
                </p>
            </div>



            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 123-456-7890</p>
                    </div>
                    <div className="footer-section">
                        <h3>Address</h3>
                        <p>123 Main Street</p>
                        <p>City, Country</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <p>Facebook | Twitter | Instagram</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}