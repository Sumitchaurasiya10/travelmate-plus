import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import API from '../services/api';
import TravelCard from '../components/TravelCard';

export default function Share() {
  const { shareId } = useParams();
  const [owner, setOwner] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/travel/shared/${shareId}`);
        setOwner(res.data.owner);
        setItems(res.data.data);
      } catch (e) {
        setError(e?.response?.data?.message || 'Link not active');
      }
    })();
  }, [shareId]);

  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container>
      <h3 className="mb-3">{owner ? `${owner.name}'s Wishlist` : 'Wishlist'}</h3>
      <Row xs={1} md={2} lg={3} className="g-3">
        {items.map((it) => (
          <Col key={it._id}>
            <TravelCard item={it} onMarkVisited={()=>{}} onDelete={()=>{}} onEdit={()=>{}} />
          </Col>
        ))}
      </Row>
      <div className="mt-3 text-muted">Read-only public view</div>
    </Container>
  );
}
