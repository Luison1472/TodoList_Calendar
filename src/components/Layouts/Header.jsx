import React from 'react';

function Header({currentYear, onAddClick}) {
  return (
    <header className="flex flex-col justify-between items-center p-4 bg-gray-950 border-b border-gray-700 mb-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-5">
          <img src="/right-arrow-white.png" className="transform scale-x-[-1] w-5" />
          <h1 className="text-sm font-bold text-left text-red-500">{currentYear}년</h1>
        </div>

        <div>
          <button className="text-3xl text-red-500" onClick={onAddClick}>+</button>
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