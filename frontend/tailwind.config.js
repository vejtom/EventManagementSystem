/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ff6600', // Vibrant Orange
        'primary-light': '#ffb380', // Lighter, pastel orange
        'primary-hover': '#e65c00', // Darker orange for hover
        secondary: '#1c3d5a', // Dark Blue
        'secondary-light': '#6b8fa3', // Light Blue, softer tone
        'secondary-hover': '#14293e', // Darker shade for hover
        accent: '#ffd966', // Soft Yellow for accents
        'accent-light': '#ffeeba', // Lighter accent color
        neutral: '#f3f4f6', // Neutral Background Color
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

