import React from 'react';
import Calendar from './calendar';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';
import '../index.css';

function ClushTask() {
  

  return (
      <div>
          <Header />
          <Calendar />
          <Footer/>
    </div>
  );
}

export default ClushTask;