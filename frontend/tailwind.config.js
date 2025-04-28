/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial'],
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        'xs': '0px', 
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        'logo': "url('https://i.imgur.com/yepIKjW.png')",
        'custom-image': "url('https://thesandboxstudio.com/wp-content/uploads/2021/11/SANDBOX-CLEAR-CREEK-TAHOE-252-MOUNTAIN-MODERN-CONTEMPORARY-HOME-REAR-TERRACE-INDOOR-OUTDOOR-LIVING-CUSTOM-FIREPIT-DINING-FEATURE.jpg')",
        'custom-image-2': "url('https://auramodernhome.com/cdn/shop/articles/img-1707349210324.jpg')",
        'custom-image-3': "url('https://www.sunset.com/wp-content/uploads/spanish-style-living-room-mindy-laven-pc-ryan-garvin-1200x600.jpg')",
        'custom-image-4': "url('https://assets.vogue.com/photos/643ec0e67ae6be44942a6aa0/master/w_2240,c_limit/08%20Family%20Estate,%20Sonoma.jpg')",
        'teal-bg': "url('https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-102387.jpg')",
        'lease-bg': "url('https://img.freepik.com/free-vector/soft-blurred-background_1034-273.jpg')",
      },
    },
  },
  plugins: [],
}