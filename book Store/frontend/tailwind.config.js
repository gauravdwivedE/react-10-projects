import daisyui from "daisyui";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files with these extensions
  ],
  darkMode: 'class',
  
  // theme: {
  //   extend: {}, // Extend Tailwind's default theme if needed
  // },

  plugins: [
    daisyui, // Add the DaisyUI plugin
  ],

};
