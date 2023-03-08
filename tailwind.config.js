/** @type {import('tailwindcss').Config} */
module.exports = {
  // tailwind css를 어디서 사용할 건지 지정해주기
  // src 폴더 내에 있는 모든 폴더그리고 지정한 확장자를 가진 파일에 적용
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
