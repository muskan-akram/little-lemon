import React from 'react';

export default function Home(){
  return (
    <main className="main container">
      <h2>Welcome to Little Lemon</h2>
      <p>Enjoy fresh local ingredients and a warm atmosphere. Use the Book a Table page to reserve your table.</p>
      <img 
        src="/images/restaurant.webp" 
        alt="Restaurant interior" 
        style={{ width: '100%', borderRadius: 8, marginTop: 12 }} 
      />
    </main>
  );
}