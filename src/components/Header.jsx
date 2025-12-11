import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container nav" role="navigation" aria-label="Main Navigation">
        <h1>Little Lemon</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/book">Book a Table</Link>
        </nav>
      </div>
    </header>
  );
}