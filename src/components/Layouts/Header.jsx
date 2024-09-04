import React from 'react';

function Header() {
  return (
    <header className="flex flex-col justify-between items-center p-4 bg-gray-950 border-b border-gray-700">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-5">
          <button className="text-lg text-white">◀</button>
          <h1 className="text-sm font-bold text-left text-white">2024년</h1>
        </div>

        <div>
          <button className="text-2xl text-white">+</button>
        </div>
      </div>


      <div className="grid grid-cols-7 text-center text-gray-500 text-xs mt-4 w-full">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="flex-1">{day}</div>
        ))}
      </div>
      
    </header>
  );
}

export default Header;