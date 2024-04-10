import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import './login.css';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);

 const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    fetch("http://localhost:8000/login", {
      method:"POST",
    body: JSON.stringify({
        email: email,
        password: password
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((res) => res.json())
      .then((data) => {
        if(data.status === "Ok")
          window.location.href='/cart';
        else
          alert("Invalid LoginId or Password......! "+data.status);
      });

    // perform login logic here
 };

 const gotoRegisterPage = () =>{
  window.location.href='/register';
 }


 return (
    <div className="login">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2> 
          <Button className="register-btn" onClick={gotoRegisterPage}>Register</Button>
          {error && <p className="text-danger">{error}</p>}
          <Form className='login-form container' onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
 );
};

export default Login;