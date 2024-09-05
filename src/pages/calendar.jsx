import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

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

//달력을 뷰포트에 표시
function MonthView({ year, month, events }) {
  const monthDays = getMonthDays(year, month);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  //오늘 날짜를 저장하는 isToday 함수 (오늘 날짜로 돌아오게 하는 함수)
  const today = new Date();
  const isToday = (date) =>
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear(); //받은 날짜들을 &&연산자로 true or false 반환

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        {monthName}
      </h2>
      <div className="grid grid-cols-7 gap-2 text-center border-b border-gray-800">
        {monthDays.map((day, index) => (
          <div
            key={index}
            // 현재 날짜에는 빨간색으로, 일정이 있을 땐 노란색으로 표시
            className={`h-9 w-9 flex items-center justify-center
              ${day ? 'text-white' : ''}
              ${day && events && events[day.toDateString()] ? 'bg-yellow-500 text-black' : ''}
              ${isToday(day) ? 'bg-red-600 text-white rounded-full' : ''}`}
          >
            <span className="leading-none">
              {day ? day.getDate() : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Calendar = forwardRef(({ events, setCurrentYear = () => { } }, ref) => {
  const [months, setMonths] = useState([
    { year: 2024, month: 8 },  // 처음엔 9월 데이터로 ,시작 0번~
    { year: 2024, month: 9 },  // 10월
    { year: 2024, month: 10 }, // 11월
  ]);
  const calendarRef = useRef(null);

  // 오늘 날짜로 스크롤을 이동하는 함수
  // forwardRef에서 받은 인자 ref 사용
  useImperativeHandle(ref, () => ({
    scrollToToday: () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      //months 배열에서 year, month 일치 항목 걸러내기 (조건에 안맞으면 -1 반환)
      const targetMonthIndex = months.findIndex(m => m.year === year && m.month === month);

      if (targetMonthIndex !== -1) {
        const element = calendarRef.current.children[targetMonthIndex];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }));

  //무한 스크롤로 캘린더 사용할 수 있도록 추가
  const handleScroll = () => {
    if (calendarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = calendarRef.current;

      // 현재 스크롤에 보이는 첫 번째 달의 년도를 갱신
      const firstVisibleMonth = Math.floor(scrollTop / (scrollHeight / months.length));
      const currentMonth = months[firstVisibleMonth];
      if (currentMonth) {
        setCurrentYear(currentMonth.year);
      }

      // 아래로 스크롤 시 다음 달 로드
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        loadMoreMonths('next');
      }

      // 위로 스크롤 시 이전 달 로드
      if (scrollTop <= 1) {
        loadMoreMonths('previous');
      }
    }
  };

  //useEffect로 스크롤 이벤트 추가
  useEffect(() => {
    const calendarElement = calendarRef.current;
    if (calendarElement) {
      calendarElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (calendarElement) {
        calendarElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [months]);

  // 스크롤을 감지하여 다음 달 또는 이전 달 추가 및 현재 년도 갱신
  const loadMoreMonths = (direction) => {
    setMonths((prevMonths) => {
      if (direction === 'next') {
        const lastMonth = prevMonths[prevMonths.length - 1];
        const nextMonth = lastMonth.month + 1 > 11
          ? { year: lastMonth.year + 1, month: 0 }
          : { year: lastMonth.year, month: lastMonth.month + 1 };
        return [...prevMonths, nextMonth];

      } else if (direction === 'previous') {
        const firstMonth = prevMonths[0];
        const previousMonth = firstMonth.month - 1 < 0
          ? { year: firstMonth.year - 1, month: 11 }
          : { year: firstMonth.year, month: firstMonth.month - 1 };

        // 스크롤을 최상단, 최하단으로 옮겼을 때 현재 위치를 기억하게 해 스크롤이 튀는 현상을 최소화 함 
        if (calendarRef.current) {
          const scrollTopBefore = calendarRef.current.scrollTop;
          const scrollHeightBefore = calendarRef.current.scrollHeight;

          // 이전 달 추가
          setTimeout(() => {
            const scrollHeightAfter = calendarRef.current.scrollHeight;
            calendarRef.current.scrollTop = scrollTopBefore + (scrollHeightAfter - scrollHeightBefore);
          }, 0);

        }

        return [previousMonth, ...prevMonths];
      }
    });
  };

  // 뷰포트에 달력 표시
  return (
    <div ref={calendarRef} className="overflow-auto h-full p-4" style={{ maxHeight: '770px' }}>
      {months.map(({ year, month }, index) => (
        <MonthView key={index} year={year} month={month} events={events} />
      ))}
    </div>
  );
});

export default Calendar;
