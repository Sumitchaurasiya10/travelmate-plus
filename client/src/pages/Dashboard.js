import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Button, Form, Badge, Card } from 'react-bootstrap';
import API from '../services/api';
import TravelCard from '../components/TravelCard';
import AddTravelForm from '../components/AddTravelForm';
import BudgetChart from '../components/BudgetChart';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('all');
  const [budget, setBudget] = useState({ plannedTotal: 0, actualTotal: 0, savings: 0 });
  const [budgetType, setBudgetType] = useState('monthly');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // ✅ useCallback for stable load function
  const load = useCallback(async () => {
    const res = await API.get('/travel', {
      params: {
        visited: filter === 'visited' ? true : filter === 'planned' ? false : undefined,
      },
    });
    setItems(res.data.data);

    const b = await API.get('/travel/budget/summary', { params: { type: budgetType } });
    setBudget(b.data.data);
  }, [filter, budgetType]);

  useEffect(() => {
    load();
  }, [load]);

  // ✅ Save function
  const save = async (form) => {
    if (editing) {
      await API.put(`/travel/${editing._id}`, form);
    } else {
      await API.post('/travel', form);
    }
    setShowForm(false);
    setEditing(null);
    await load();
  };

  // ✅ Delete function
  const onDelete = async (id) => {
    await API.delete(`/travel/${id}`);
    await load();
  };

  // ✅ Mark visited function
  const onMarkVisited = async (item) => {
    const actualSpent = prompt('Enter actual spent for this trip (optional):', item.actualSpent || 0);
    const notes = prompt('Add some notes for your travel journal (optional):', item.notes || '');
    await API.put(`/travel/${item._id}/visited`, { actualSpent: Number(actualSpent || 0), notes });
    await load();
  };

  // ✅ Toggle public sharing
  const toggleShare = async () => {
    const res = await API.put('/auth/toggle-share');
    alert(res.data.shareEnabled ? 'Public sharing enabled' : 'Public sharing disabled');
  };

  return (
    <div className="dashboard-bg">
      <Container className="py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 dashboard-header">
          <h3 className="fw-bold text-white">
            Hello, {user?.user?.name}{' '}
            <Badge bg="light" text="dark" className="ms-2">TravelMate+</Badge>
          </h3>
          <div className="d-flex gap-2">
            <Button variant="light" onClick={() => setShowForm(true)} className="btn-glass">+ Add Destination</Button>
            <Button variant="outline-light" onClick={toggleShare} className="btn-glass">Toggle Sharing</Button>
          </div>
        </div>

        {/* Filters + Budget Type */}
        <Row className="mb-4">
          <Col md={6} className="d-flex gap-2 align-items-center">
            <Form.Select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="planned">Planned</option>
              <option value="visited">Visited</option>
            </Form.Select>
          </Col>

          <Col md={6} className="d-flex gap-2 justify-content-md-end align-items-center mt-3 mt-md-0">
            <Form.Select className="filter-select" value={budgetType} onChange={(e) => setBudgetType(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Cards + Chart */}
        <Row>
          <Col md={8}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {items.map((it) => (
                <Col key={it._id}>
                  <div className="card-glass">
                    <TravelCard
                      item={it}
                      onMarkVisited={onMarkVisited}
                      onDelete={onDelete}
                      onEdit={(itm) => { setEditing(itm); setShowForm(true); }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-lg glass-chart">
              <h5 className="mb-3 text-center">
                Budget Tracker ({budgetType.charAt(0).toUpperCase() + budgetType.slice(1)})
              </h5>
              <BudgetChart
                plannedTotal={budget.plannedTotal}
                actualTotal={budget.actualTotal}
                budgetType={budgetType}
              />
            </Card>
            <div className="mt-3 small text-white-50">
              Public link: {user?.user?.shareId ? `${window.location.origin}/share/${user.user.shareId}` : 'Disabled'}
            </div>
          </Col>
        </Row>

        <AddTravelForm
          show={showForm}
          onHide={() => { setShowForm(false); setEditing(null); }}
          onSave={save}
          initial={editing}
        />
      </Container>
    </div>
  );
}
