/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    screens: {
      'sm': '393px', // iPhone 15 Pro 기준
      'md': '768px', // 중간 크기 디바이스
      'lg': '1024px', // 큰 디바이스
      'xl': '1280px', // 데스크탑
      '2xl': '1536px', // 큰 데스크탑
    },
  },
};
export const plugins = '';