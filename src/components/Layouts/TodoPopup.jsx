import React, { useState } from 'react';

function TodoPopup({ selectedDate, onClose, addEvent, existingTodos, toggleTodoCompletion, deleteTodo }) {
  const [todoText, setTodoText] = useState('');
  const [tempDate, setTempDate] = useState(selectedDate ? selectedDate.toISOString().split('T')[0] : '');

  // 요일 계산 함수
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getDay()];
  };

  // 새로운 To-Do 추가
  const handleSubmit = () => {
    const date = selectedDate ? selectedDate.toDateString() : new Date(tempDate).toDateString();
    if (todoText.trim() && date) {
      addEvent(date, { text: todoText, completed: false }); // 새로운 To-Do는 완료되지 않은 상태로 추가
      setTodoText('');  // 입력 필드 초기화
      if (!selectedDate) setTempDate('');  // 날짜 선택 모드일 때만 초기화
    }
  };

  const handleDateChange = (e) => {
    setTempDate(e.target.value);  // 날짜 선택
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg w-80">
        {/* 날짜가 선택된 경우 vs 선택되지 않은 경우 */}
        {selectedDate ? (
          <h2 className="text-lg mb-4">
            {selectedDate.toLocaleDateString()} {getDayOfWeek(selectedDate.toISOString())}
          </h2>
        ) : (
          <div className="mb-4">
            <h2 className="text-lg mb-4">할일을 추가할 날짜를 입력하세요</h2>
            <input
              type="date"
              value={tempDate}
              onChange={handleDateChange}
              className="w-full p-2 border"
            />
            {/* 선택된 날짜와 요일을 공백으로 구분하여 표시 */}
            {tempDate && (
              <p className="mt-2 text-sm text-gray-500">
                {new Date(tempDate).toLocaleDateString()} {getDayOfWeek(tempDate)}
              </p>
            )}
          </div>
        )}

        {/* 작성한 TodoList 보여주기 */}
        {existingTodos && existingTodos.length > 0 ? (
          <ul className="mb-4">
            {existingTodos.map((todo, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoCompletion(selectedDate ? selectedDate.toDateString() : new Date(tempDate).toDateString(), index)}
                    className="mr-2"
                  />
                  <span className={todo.completed ? 'line-through text-gray-500 w-52' : 'w-52'}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(selectedDate ? selectedDate.toDateString() : new Date(tempDate).toDateString(), index)}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mb-4">To-Do-List를 작성해주세요</p>
        )}

        {/* 새 To-Do 추가 */}
        <textarea
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="새로운 할 일을 추가하세요"
          className="w-full p-2 border mb-4"
        ></textarea>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">닫기</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-gray-950 text-white rounded" disabled={!todoText.trim() || (!selectedDate && !tempDate)}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoPopup;