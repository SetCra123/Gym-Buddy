import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import '../AuthForms.css';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

export default function Signup() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const response = await createUser(userFormData);
      const { token, user } = response;
      Auth.login(token, user, '/profile-update');
      showAlert(false);
      setUserFormData({ username:"", email:"", password:"" });

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

    //   const { token, user } = await response.json();
    //   console.log(user, token);
    //   Auth.login(token);
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
            <div className="auth-page-container">
                <div className="auth-card">
                    <h2>Gym Buddy</h2>
                    <h3>Create an account and get a custom workout!</h3>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                            Something went wrong with your sign-up!
                        </Alert>
                        <Form.Group className="mb-3 form-sup">
                            <Form.Label htmlFor="username">
                                <strong>Username</strong>
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your username" 
                                name="username" 
                                onChange={handleInputChange}
                                value={userFormData.username}
                                className="form-control rounded" 
                                required
                            />
                            <Form.Control.Feedback type="invalid">Username is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 form-sup">
                            <Form.Label htmlFor="email">
                                <strong>Email</strong>
                            </Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder="Enter your eamil" 
                                name="email" 
                                onChange={handleInputChange}
                                value={userFormData.email}
                                className="form-control rounded"
                                required
                            />
                            <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 form-sup">
                            <Form.Label htmlFor="password">
                                <strong>Password</strong>
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                name="password" 
                                onChange={handleInputChange}
                                value={userFormData.password}
                                className="form-control rounded" 
                                required
                            />
                            <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Button 
                            disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                            type="submit" 
                            variant="success"
                            className="btn btn-success w-100 rounded">
                            Sign-up
                        </Button>
                        <div>
                            <p className="text-center mb-0 mt-3 form-sup">Already have an account?</p>
                            <Link to='/login' className="btn btn-primary border w-100 rounded rext-decoration-nopne">
                                Login
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
