import { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../login.css';
import { login } from '../utils/API';
import Auth from '../utils/auth';

export default function Login() {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const response = await login(userFormData);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { token, user } = await response.json();
            localStorage.setItem('user', user);
            console.log(user);
            Auth.login(token, user);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };



    return (
        <>
            <div className="form-container d-flex justify-content-center align-items-center mt-5">
                <div className="form-div bg-white p-3 rounded border">
                    <h2>Login</h2>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                            Something went wrong with your login credentials!
                        </Alert>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">
                                <strong>Email</strong>
                            </Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your eamil" 
                                onChange={handleInputChange} 
                                name="email" 
                                value={userFormData.email}
                                className="form-control rounded" 
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">
                                <strong>Password</strong>
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                onChange={handleInputChange}
                                name="password" 
                                value={userFormData.password}
                                className="form-control rounded" 
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button 
                                disabled={!(userFormData.email && userFormData.password)}
                                type="submit" 
                                className="btn btn-success w-100 rounded">
                                Login
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-center mb-0 mt-3">Don't have an account?</p>
                            <Link to='/signup' className="btn btn-primary border w-100 rounded text-decoration-none">
                                Sign-up
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}