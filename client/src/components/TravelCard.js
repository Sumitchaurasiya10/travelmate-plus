import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, ProgressBar } from 'react-bootstrap';
import '../styles/TravelCard.css';

export default function TravelCard({ item, onMarkVisited, onDelete, onEdit }) {
  const [showNotes, setShowNotes] = useState(false);
  const [animateVisited, setAnimateVisited] = useState(false);
  const [progress, setProgress] = useState(0); // Animated progress

  const budgetPercent = item.plannedBudget 
    ? Math.min(Math.round((item.actualSpent / item.plannedBudget) * 100), 100) 
    : 0;

  // Trip Vibe
  let vibe = '💸 Budget Friendly';
  let vibeColor = 'success';
  if (item.actualSpent > item.plannedBudget) {
    vibe = '🔥 Luxurious';
    vibeColor = 'danger';
  }
  if (item.visited && item.notes) {
    vibe = '✨ Dream Trip';
    vibeColor = 'info';
  }

  // Profit/Loss per trip
  const diff = (item.plannedBudget || 0) - (item.actualSpent || 0);
  const status = diff >= 0 ? "Savings" : "Overspent";
  const statusColor = diff >= 0 ? "success" : "danger";

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.placeName)}`;

  // Trigger animation when marked visited
  const handleMarkVisited = (trip) => {
    setAnimateVisited(true);
    onMarkVisited(trip);
  };

  useEffect(() => {
    if (animateVisited) {
      const timer = setTimeout(() => setAnimateVisited(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animateVisited]);

  // Animate Progress Bar
  useEffect(() => {
    let start = 0;
    const step = budgetPercent / 20; // 20 steps
    const interval = setInterval(() => {
      start += step;
      if (start >= budgetPercent) {
        start = budgetPercent;
        clearInterval(interval);
      }
      setProgress(Math.round(start));
    }, 30);
    return () => clearInterval(interval);
  }, [budgetPercent]);

  return (
    <Card className="shadow-sm travel-card">
      <div className="image-wrapper">
        <img 
          src={item.photo || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'} 
          alt={item.placeName} 
        />
        <div className="overlay"></div>
        <div className="image-text">
          <h5 className="card-title">{item.placeName}</h5>
        </div>
      </div>

      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{item.placeName}</Card.Title>
          <Badge 
            bg={item.visited ? 'success' : 'secondary'} 
            className={animateVisited ? 'visited-badge-animate' : ''}
          >
            {item.visited ? 'Visited' : 'Planned'}
          </Badge>
        </div>

        {/* Vibe Badge */}
        <Badge bg={vibeColor} className="mb-2">{vibe}</Badge>

        <Card.Text className="mt-2 mb-1">
          <strong>Country:</strong> {item.country}<br />
          <strong>Planned:</strong> ${item.plannedBudget || 0}<br />
          <strong>Actual:</strong> ${item.actualSpent || 0}
        </Card.Text>

        {/* Profit/Loss Badge */}
        <Badge bg={statusColor} className="mb-2">
          {status}: ${Math.abs(diff)}
        </Badge>

        <ProgressBar 
          now={progress} 
          label={`${progress}%`} 
          variant={progress > 100 ? 'danger' : 'info'} 
          className="mb-2 transition-bar"
        />

        {item.notes && (
          <>
            <Card.Text className="notes-preview">
              {showNotes ? item.notes : item.notes.slice(0,50) + (item.notes.length > 50 ? '...' : '')}
            </Card.Text>
            {item.notes.length > 50 && (
              <Button 
                size="sm" 
                variant="link" 
                onClick={() => setShowNotes(!showNotes)}
              >
                {showNotes ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </>
        )}

        <div className="d-flex gap-2 mt-2">
          {!item.visited && (
            <Button size="sm" variant="success" onClick={() => handleMarkVisited(item)}>
              Mark Visited
            </Button>
          )}
          <Button size="sm" variant="outline-primary" onClick={() => onEdit(item)}>
            Edit
          </Button>
          <Button size="sm" variant="outline-danger" onClick={() => onDelete(item._id)}>
            Delete
          </Button>
          <Button size="sm" variant="outline-info" onClick={() => window.open(mapsUrl, '_blank')}>
            📍 Map
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
