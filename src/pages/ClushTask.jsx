import React, { useState, useRef } from 'react';
import Calendar from './calendar';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';
import TodoPopup from '../components/Layouts/TodoPopup';
import '../index.css';

function ClushTask() {
    const [events, setEvents] = useState({});
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);

    const addEvent = (date, event) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: [...(prevEvents[date] || []), event],
    }));
    };

   const toggleTodoCompletion = (date, index) => {
  setEvents((prevEvents) => {
    if (!prevEvents[date]) {
      return prevEvents;  // 해당 날짜에 할일이 없으면 그대로 반환
    }

    // 할일 목록을 복사한 후, 완료 상태를 변경
    const updatedTodos = [...prevEvents[date]];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    return {
      ...prevEvents,
      [date]: updatedTodos,
    };
  });
};
  // To-Do 삭제
  const deleteTodo = (date, index) => {
    setEvents((prevEvents) => {
      const updatedTodos = prevEvents[date].filter((_, i) => i !== index);
      return {
        ...prevEvents,
        [date]: updatedTodos,
      };
    });
  };
    
    const scrollToToday = () => {
        if (calendarRef.current) {
            calendarRef.current.scrollToToday();
        }
    };

    //+버튼 팝업 열기
    const openPopup = () => {
    setIsPopupOpen(true);
    setSelectedDate(null);  // 선택된 날짜 초기화
  };

  // 날짜 클릭 시 팝업 열기
  const openPopupWithDate = (date) => {
    setIsPopupOpen(true);
    setSelectedDate(date);  // 클릭한 날짜 설정
  };

  return (
      <div className="min-h-screen bg-gray-950 text-white">
          <Header currentYear={currentYear} onAddClick={openPopup} />
          <Calendar
              events={events}
              setCurrentYear={setCurrentYear}
              ref={calendarRef}
              onDateClick={openPopupWithDate}/>
          <Footer scrollToToday={scrollToToday} />

    {isPopupOpen && (
        <TodoPopup
          selectedDate={selectedDate}
          onClose={() => setIsPopupOpen(false)}
          addEvent={addEvent}
          existingTodos={selectedDate ? events[selectedDate.toDateString()] : []}  // 해당 날짜의 To-Do 리스트
          toggleTodoCompletion={toggleTodoCompletion}  // To-Do 완료 상태 변경
          deleteTodo={deleteTodo}  // To-Do 삭제
        />
      )}
    </div>
    
  );
}

export default ClushTask;