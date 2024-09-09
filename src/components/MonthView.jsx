import React from 'react';

//특정 월의 시작 날짜가 무슨 요일인지 계산
const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay(); //해당 연도, 월의 첫째 날
  const daysInMonth = new Date(year, month + 1, 0).getDate(); //해당 월의 총 일수 , 이전 달의 마지막 날짜
  const days = []; //날짜 데이터 배열

  for (let i = 0; i < firstDay; i++) { //첫 번째 주 빈칸 채우기 (ex.31일이 목요일 경우)
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) { //해당 월의 날짜 채우기
    days.push(new Date(year, month, i));
  }

  return days;
};

// MonthView 컴포넌트
function MonthView({ year, month, events, onDateClick }) {
  const monthDays = getMonthDays(year, month);

  // 오늘 날짜를 저장하는 isToday 함수 
  const today = new Date();
  const isToday = (date) =>
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear(); //받은 날짜들을 &&연산자로 true or false 반환

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        {new Date(year, month).toLocaleString('default', { month: 'long' })}
      </h2>
      <div className="grid grid-cols-7 gap-2 gap-y-6 text-center border-b border-gray-800 w-full">
  {monthDays.map((day, index) => (
    <div
      key={index}
      className={`flex items-center justify-center
        ${day ? 'text-white' : ''}
        ${day && events && events[day.toDateString()] ? 'bg-yellow-400 rounded-full font-bold' : ''}
        ${day ? 'cursor-pointer' : ''}
        ${isToday(day) ? 'bg-red-600 rounded-full font-bold ' : ''}`}
      onClick={() => day && onDateClick(day)}
    >
      <span>
        {day ? day.getDate() : ''}
      </span>
    </div>
  ))}
</div>
    </div>
  );
}

export default MonthView;
