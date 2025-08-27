import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { 
  FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, 
  FaPlane, FaBed, FaUsers, FaStickyNote, FaMap 
} from 'react-icons/fa';
import '../styles/AddTravelForm.css';

export default function AddTravelForm({ show, onHide, onSave, initial }) {
  const [form, setForm] = useState({
    placeName: '',
    country: '',
    plannedBudget: 0,
    photo: '',
    startDate: '',
    endDate: '',
    travelType: 'Relaxation',
    priority: 'Medium',
    accommodation: '',
    transport: '',
    companions: 'Solo',
    notes: ''
  });

  useEffect(() => {
    if (initial) setForm(prev => ({ ...prev, ...initial }));
  }, [initial]);

  // Save handler
  const submit = async (e) => {
    e.preventDefault();
    try {
      await onSave(form);
      onHide();
    } catch (err) {
      console.error("Error saving travel:", err);
      alert("Failed to save travel, please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{initial ? 'Edit Destination' : 'Add Destination'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* Location Section */}
          <h6 className="section-header">📍 Location</h6>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label><FaMapMarkerAlt /> Place Name</Form.Label>
                <Form.Control 
                  placeholder="Enter place name"
                  value={form.placeName}
                  onChange={e => setForm({...form, placeName:e.target.value})} 
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label><FaMapMarkerAlt /> Country</Form.Label>
                <Form.Control 
                  placeholder="Enter country"
                  value={form.country} 
                  onChange={e => setForm({...form, country:e.target.value})} 
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Budget & Photo */}
          <h6 className="section-header">💰 Budget & Photo</h6>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label><FaMoneyBillWave /> Planned Budget ($)</Form.Label>
                <Form.Control 
                  type="number" min="0"
                  value={form.plannedBudget} 
                  onChange={e => setForm({...form, plannedBudget:Number(e.target.value)})} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Photo</Form.Label>
                <Form.Control 
                  type="url"
                  placeholder="Enter image URL"
                  value={form.photo} 
                  onChange={e => setForm({...form, photo:e.target.value})} 
                />
                <Form.Text className="text-muted">
                  Or upload an image from your device
                </Form.Text>
                <Form.Control 
                  type="file" accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setForm({...form, photo: reader.result});
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-2"
                />
                {form.photo && (
                  <div className="mt-2 text-center">
                    <img src={form.photo} alt="Preview" className="photo-preview" />
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Dates */}
          <h6 className="section-header"><FaCalendarAlt /> Travel Dates</h6>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={form.startDate} 
                  onChange={e => setForm({...form, startDate:e.target.value})} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={form.endDate} 
                  onChange={e => setForm({...form, endDate:e.target.value})} 
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Travel Details */}
          <h6 className="section-header">⭐ Travel Details</h6>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Travel Type</Form.Label>
                <Form.Select 
                  value={form.travelType} 
                  onChange={e => setForm({...form, travelType:e.target.value})}
                >
                  <option>Relaxation</option>
                  <option>Adventure</option>
                  <option>Cultural</option>
                  <option>Road Trip</option>
                  <option>Beach</option>
                  <option>Mountain</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Select 
                  value={form.priority} 
                  onChange={e => setForm({...form, priority:e.target.value})}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label><FaUsers /> Companions</Form.Label>
                <Form.Select 
                  value={form.companions} 
                  onChange={e => setForm({...form, companions:e.target.value})}
                >
                  <option>Solo</option>
                  <option>Family</option>
                  <option>Friends</option>
                  <option>Couple</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label><FaBed /> Accommodation</Form.Label>
                <Form.Control 
                  placeholder="Hotel, Airbnb, Camping..." 
                  value={form.accommodation} 
                  onChange={e => setForm({...form, accommodation:e.target.value})} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label><FaPlane /> Transport Mode</Form.Label>
                <Form.Control 
                  placeholder="Flight, Train, Car..." 
                  value={form.transport} 
                  onChange={e => setForm({...form, transport:e.target.value})} 
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Notes */}
          <Form.Group className="mb-3">
            <Form.Label><FaStickyNote /> Notes / Checklist</Form.Label>
            <Form.Control 
              as="textarea" rows={3} 
              placeholder="Special notes or packing items..." 
              value={form.notes} 
              onChange={e => setForm({...form, notes:e.target.value})} 
            />
          </Form.Group>

          {/* Map Button */}
          {form.placeName && form.country && (
            <div className="text-center mb-3">
              <Button 
                variant="outline-primary" 
                href={`https://www.google.com/maps/search/${encodeURIComponent(form.placeName + ',' + form.country)}`} 
                target="_blank"
              >
                <FaMap /> View on Google Maps
              </Button>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
