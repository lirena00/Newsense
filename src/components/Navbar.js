import Link from "next/link";
import { useState } from "react";
import {motion} from "framer-motion";

export default function Navbar() {
    
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const topics = ['Politics', 'Business', 'Sports', 'Entertainment', 'Science', 'Technology', 'International', 'Education', 'Fashion']
  return (
    <nav className="border-b flex border-r-white  items-center bg-background/50 z-50 backdrop-blur-xl w-full fixed top-0 left-0   gap-4 p-2 text-left">
<button
   data-collapse-toggle="navbar-dropdown"
   type="button"
   className="inline-flex items-center p-2  w-10 h-10 outline-none justify-center text-sm text-white "
   aria-controls="navbar-dropdown"
   aria-expanded={isDropdownOpen}
   onClick={toggleDropdown}
 >

   <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
   </svg>
 </button>

 
 <motion.div  
initial={{ x:-20, opacity: 0 }}
whileInView={{ x:0,y:0 , opacity: 1 }}
transition={{ duration: 0.1 }}

 className={` absolute top-full z-50 -left-1  ${isDropdownOpen ? 'block' : 'hidden'}`} id="navbar-dropdown">
 <ul className="w-[25vh] bg-background backdrop-blur-xl flex flex-col font-medium  h-screen border-r text-lg card text-white border-gray-100 py-2 transition-all duration-300">
<Link href="/">
<li className="hover:bg-primary p-1.5 px-4 transition-all duration-120 border-action hover:border-l-8 ">
Home
</li>
</Link>


{topics.map((topic, index) => (
  <Link key={index} href={`/topics/${topic}`}>
    <li className="transition-all duration-120 border-action hover:border-l-8 hover:bg-primary p-2 px-4">
      {topic}
    </li>
  </Link>
  ))}

</ul>



</motion.div>
<span className="text-2xl font-semibold text-primary select-none" style={{ fontFamily: 'Comfortaa' }}>
  <Link href="/"> 
  [newsense]
  </Link>
  <span className="text-xs ml-2">Avoid Nuisance</span>
  </span>
   
  <span className="absolute rounded-full hover:bg-primary  right-2">
  <Link href="https://github.com/LiReNa00/Newsense" target="_blank" className="bg-black">
<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>
</Link>
</span>

</nav>
  );
}