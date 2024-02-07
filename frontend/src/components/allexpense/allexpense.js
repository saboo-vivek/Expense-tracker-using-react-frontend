import React, { useState, useEffect } from 'react';
import './allexpense.css'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Container, Nav, Navbar, Spinner, Card, Button, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
export default function Allexpense() {
    const navigate = useNavigate()
    const [expenses, setExpenses] = useState([]);
    const [isFormVisible, setFormVisibility] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [idvalue, setId] = useState('')
    const [refresh, setRefresh] = useState(false);
    const [totalamount, setTotalamount] = useState('');
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        let ar = await axios.get("process.env.REACT_APP_API_KEY/expense/show", { headers: { Authorization: token } })
        setExpenses(ar.data.result)
        let res=await axios.get('process.env.REACT_APP_API_KEY/total',{ headers: { Authorization: token } })  
       setTotalamount(res.data.result)
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }
    const handleEdit = async (e) => {
        let i = e.currentTarget.parentNode.id;
        setId(i);
        setFormVisibility(true)
    };
    const handleFormSubmit=async(e)=>{
        setFormVisibility(false)
        e.preventDefault()
        let token = localStorage.getItem("token")
        const x = {
            price: amount,
            desc: description,
            category: category
        }
        let res = await axios.put(`process.env.REACT_APP_API_KEY/expense/update/${idvalue}`, x, { headers: { Authorization: token } })
        console.log(res.data.result)
        fetchData();
    }

    const handleDelete = async (e) => {
    try {
        let id = e.currentTarget.parentNode.id;
        const token = localStorage.getItem("token");
        let res = await axios.delete(`process.env.REACT_APP_API_KEY/expense/delete/${id}`, { headers: { Authorization: token } });
        console.log(res.data.result);
        fetchData();
    } catch (error) {
        console.error("Error deleting expense:", error);
    }
};

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='expmain'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Spinner animation="grow" size="sm" variant="light" />
                <Spinner animation="grow" variant="light" />
                <Container>
                    <Nav className="me-auto navlinks">
                        <NavLink to="/home" className='curr'>Home</NavLink>
                        <NavLink to="/about" className='curr'>About Us</NavLink>
                        <NavLink to="/contact" className='curr'>Contact Us</NavLink>
                        <span className='totalexpense'>Total expense till now:{totalamount}</span>
                        <Nav.Link className='logoutbtn' onClick={handleLogout}>
                            <IoLogOutOutline /> Logout
                        </Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
            {isFormVisible && (
                <div className='popform'>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Amount:
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Category:
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                </div>
            )}
            <h2 className="middle">Expenses</h2>
            <div className='listclass'>
                <ol className="expense-list">
                    {expenses.map((expense) => (
                        <li key={expense._id} className="listItem" id={expense._id}>
                            <span>
                                Amount: {expense.amount} &nbsp;&nbsp;&nbsp;&nbsp; Description: {expense.description} &nbsp;&nbsp;&nbsp;&nbsp; Category: {expense.category}
                            </span>
                            <MdDelete size={30} onClick={handleDelete} className='dbtn' />
                            <FaRegEdit size={30} onClick={handleEdit} className='ebtn' />
                        </li>
                    ))}
                </ol>
            </div>

        </div>
    );


}