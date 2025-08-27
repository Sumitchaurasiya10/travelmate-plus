import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('user', JSON.stringify({ token: res.data.token, user: res.data.user }));
      navigate('/dashboard');
    } catch (e) {
      setError(e?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-3">Register</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={submit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} onChange={e=>setName(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
              </Form.Group>
              <Button type="submit">Create Account</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
