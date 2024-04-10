import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import './login.css'

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmpassword, setconfirmpassword] = useState('');
 const [name, setName] = useState('');
 const [contect, setContect] = useState('');
 const [address, setAddress] = useState('');
 const [error, setError] = useState(null);

 function validateFields(email, password, confirmPassword, contact) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  // Validate Name
  if (!name.trim()) {
      return { isValid: false, message: "Name field cannot be empty" };
  }

  if (!phoneRegex.test(contact)) {
    return { isValid: false, message: "Invalid Mobile formate" };
}

  // Validate Email
  if (!emailRegex.test(email)) {
      return { isValid: false, message: "Invalid email format" };
  }

  // Validate Password
  if (password.length < 8) {
      return { isValid: false, message: "Password should be at least 8 characters long" };
  }

  // Validate Confirm Password
  if (password !== confirmPassword) {
      return { isValid: false, message: "Passwords do not match" };
  }

  // Validate Address

  // All fields are valid
  return { isValid: true, message: "All fields are valid" };
}


 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let validator = validateFields(email,password,confirmpassword,contect);

    if(validator.isValid){

      fetch("http://localhost:8000/register", {
         
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          contect:contect,
          address:address
      }),
       
      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json() )
    .then(data =>{
      if(data.status === "Ok")
        window.location.href='/login';
      else
        alert("Internal server error");
    });    
    setEmail("");
    setPassword("");
    setconfirmpassword("");
    setAddress("");
    setContect("");
    setName("");
  }
  else{
    alert(validator.message);
  }
 };

 return (
    <div className="login">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create your account</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form className='container login-form' onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group id="contect">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="number" required value={contect} onChange={(e) => setContect(e.target.value)} />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
 );
};

export default Login;