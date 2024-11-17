/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     /* css from assets folder */
     "assets/css/*.css",
     /* relevant files from the blog + theme */
     "../../content/**/*.{html,md}",
     "../../layouts/**/*.html",
     /* relevant files from the theme */
     "./layouts/**/*.html",
     /* also pick nested css from theme */
     "../../assets/css/*.css",
   ],
   theme: {
    extend: {
       backgroundImage: {
         'hero': "url('/hero.webp')",
         'hero-2': "url('/idea-2.jpg')",
      },
     },
   },
   plugins: [
      require('@tailwindcss/typography'),
   ],
 }
 