/**
 * Tailwind CSS - MedWorkflow Digital
 * Medical Authority palette + Inter/Poppins
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0A2463',       // Primary Navy - trust, professional
        'teal': '#00A896',       // Medical Teal - healthcare, modern
        'bright-blue': '#2E86DE', // CTAs, energy
        'white': '#FFFFFF',
        'off-white': '#F7FAFC',  // Section backgrounds
        'heading': '#1A202C',    // Headlines
        'body-text': '#4A5568', // Paragraph text
        'success': '#38A169',    // Checkmarks, trust badges
        'border': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.6' }],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
