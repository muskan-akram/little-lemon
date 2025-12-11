import React from 'react';
import BookingForm from '../components/BookingForm.jsx';

export default function BookTable(){
  return (
    <main className="main container">
      <h2>Reserve a Table</h2>
      <BookingForm />
    </main>
  );
}