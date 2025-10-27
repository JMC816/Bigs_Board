/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
         theme: {
           extend: {
             animation: {
               'spin': 'spin 1s linear infinite',
               'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
             },
             keyframes: {
               spin: {
                 'to': {
                   transform: 'rotate(360deg)',
                 },
               },
               pulse: {
                 '50%': {
                   opacity: '0.5',
                 },
               },
             },
           },
         },
  plugins: [],
}
