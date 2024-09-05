import React, { useState, useRef } from 'react';
import Calendar from './calendar';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';
import '../index.css';

function ClushTask() {
    const [events, setEvents] = useState({});
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const calendarRef = useRef(null);

    const addEvent = (date, event) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: [...(prevEvents[date] || []), event],
    }));
    };
    
    const scrollToToday = () => {
        if (calendarRef.current) {
            calendarRef.current.scrollToToday();
        }
    };

  return (
      <div className="min-h-screen bg-gray-950 text-white">
          <Header currentYear={currentYear} />
          <Calendar
              events={events}
              setCurrentYear={setCurrentYear}
              ref={calendarRef} />
          <Footer scrollToToday={scrollToToday} />
    </div>
  );
}

export default ClushTask;