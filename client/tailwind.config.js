/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {pattern: /bg-./},
    {pattern: /text-./},
    {pattern: /border-./},
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#BC2A79',
      },
    },
  },
  plugins: [],
}

