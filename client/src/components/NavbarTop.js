import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/NavbarTop.css'; // ✅ Import custom CSS

export default function NavbarTop() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="mb-4 custom-navbar">
      <Container>
        <Navbar.Brand onClick={() => navigate('/dashboard')} style={{cursor:'pointer'}}>
          TravelMate+
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>}
            <Nav.Link onClick={() => navigate(`/share/${user?.user?.shareId || ''}`)}>Public View</Nav.Link>
          </Nav>
          <div className="d-flex">
            {!user ? (
              <>
                <Button variant="outline-primary" className="me-2" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="primary" onClick={() => navigate('/register')}>Register</Button>
              </>
            ) : (
              <Button variant="outline-danger" onClick={logout}>Logout</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
