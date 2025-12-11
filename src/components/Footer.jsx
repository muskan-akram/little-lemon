import React from 'react';

export default function Footer(){
  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}