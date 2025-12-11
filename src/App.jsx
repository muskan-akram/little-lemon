
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BookTable from './pages/BookTable.jsx';
import Confirm from './pages/Confirm.jsx';
import { BookingProvider } from './BookingContext.jsx';

export default function App(){
  return (
    <BookingProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/book" element={<BookTable/>} />
          <Route path="/confirm" element={<Confirm/>} />
          <Route path="*" element={<main className="main container"><h2>Page not found</h2></main>} />
        </Routes>
        <Footer />
      </div>
    </BookingProvider>
  );
}
