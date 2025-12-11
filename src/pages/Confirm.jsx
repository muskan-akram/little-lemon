import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Confirm(){
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <main className="main container">
        <h2>No booking found</h2>
        <p>Please make a booking first. <Link to="/book">Book a table</Link></p>
      </main>
    );
  }

  return (
    <main className="main container">
      <h2>Booking Confirmed</h2>
      <p>Thanks, <strong>{booking.name}</strong> — your table for <strong>{booking.guests}</strong> guests on <strong>{booking.date}</strong> at <strong>{booking.time}</strong> is confirmed.</p>
      <p>Occasion: {booking.occasion}</p>
      <p><Link to="/">Back to Home</Link></p>
    </main>
  );
}