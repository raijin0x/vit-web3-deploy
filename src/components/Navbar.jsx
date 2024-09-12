import React, { useContext } from "react"; 
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import 'flowbite'; 
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Import icons from Heroicons 
 

import logo from "../../images/logo.svg";

const NavBarItem = ({ title, classprops, menuLink }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}> <a href={menuLink}>  {title} </a></li>
);


function Navbar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
 

  const [toggleMenu, setToggleMenu] = React.useState(false);

  const menuItems = {
    Home: "/Home",
    Donate: "/Donate",
    Services: "/services",
    DrawingApp: "/DrawingApp", 
  };
  const menuArray = Object.entries(menuItems);

  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };





  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <a href="#">  <img src={logo} alt="logo" className=" cursor-pointer" width="250px" /></a>
      </div>
      <ul className=" text-black dark:text-white   md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {menuArray.map(([key, value], index) => (
          <NavBarItem key={key + index} title={key} menuLink={value} />
        ))}
        <li onClick={toggleModal} className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]  text-white dark:text-white">

          Connect Wallet

        </li>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Select a Wallet</h2>
              {/* Your wallet options here */}
              <button onClick={toggleModal} className="bg-red-500 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        )}
  

        <li onClick={toggleDarkMode} className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] flex items-center justify-center"  >
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-white" aria-hidden="true" />
          ) : (
            <MoonIcon className="h-6 w-6 text-white" aria-hidden="true" />
          )}
        </li>
      </ul>

      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {menuArray.map(([key, value], index) => (
              <NavBarItem key={key + index} title={key} menuLink={value} />
            ))}
          </ul>
        )}
      </div>


    </nav>
  )
}

export default Navbar
