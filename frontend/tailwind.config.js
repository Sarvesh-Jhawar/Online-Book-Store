/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.jsx",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        primary: "#1d4ed8",
        secondary: "#9333ea",
        muted: "#f4f4f5",
        accent: "#f3f4f6",
        destructive: "#ef4444",
        border: "#e5e7eb",
        input: "#f9fafb",
        ring: "#2563eb",
      },
    },
  },
  plugins: [],
};
