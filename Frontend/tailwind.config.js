/* eslint-disable no-undef */
import daisyui from 'daisyui';
const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            },
            colors: {
                neutralSilver: '#F5F7Fa',
                neutralDGrey: '#4D4D4D',
                brandPrimary: '#2196F3',
                brandSecondary: '#2C2C54',
                neutralGrey: '#717171',
                brandLight: '#ffffff'
            }
        }
    },
    darkMode: 'selector',
    plugins: [daisyui]
};
