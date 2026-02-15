
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setISOpen ] = useState(false); // for hamburger menu

     return (
        <nav className=" bg-black text-white shadow-md">
            <div className="mx-auto px-4">
                <div className=" flex justify-between items-center h-16 p-4">


                    {/* mobile display button not to display on md and larg screen*/}

                     <button onClick={ () => setISOpen(true)}  className="md:hidden text-2xl"> ☰</button>

                     {/*logo */}
                     <div className=" text-2xl md:text-3xl">

                        Musa's Salon

                     </div>

                     {/* Destop and tablet mune */}

                     <div className=" hidden md:flex space-x-8">
                         <Link to="/" className="hover:text-gray-400">Home</Link>
                         <Link to="/haircut" className="hover:text-gray-400">HairCut</Link>
                         <Link to="/nail" className="hover:text-gray-400">Nail Service</Link>
                         <Link to="/treatment" className="hover:text-gray-400">Hair Treatment</Link>
                         <Link to="/history" className="hover:text-gray-400">Booking History</Link>
                         <Link to="/about" className="hover:text-gray-400">About Us</Link>
                         <Link to="/login" className="hover:text-gray-400">Login</Link>

                     </div>



                     
                </div>

            </div>
             
            {/* Mobile sidebar  menu*/}
            <div className={`fixed top-0 left-0 h-full w-64 bg-black transform ${ isOpen ? "translate-x-0" : "-translate-x-full"
                   } transition-transform duration-300 ease-in-out md:hidden`}>

                <div className=" p-4 flex justify-between items-center border-b border-gray-700">
                    
                    <button onClick={() => setISOpen(false)}> ❌</button>

                </div>


                <div className="flex flex-col space-y-4 p-4">
                    <Link to="/" onClick={() => setISOpen(false)} className="hover:text-gray-400">Home</Link>
                    <Link to="/haircut" onClick={() => setISOpen(false)} className="hover:text-gray-400">HairCut</Link>
                    <Link to="/nail" onClick={() => setISOpen(false)} className="hover:text-gray-400">Nail Service</Link>
                    <Link to="/treatment" onClick={() => setISOpen(false)} className="hover:text-gray-400">Hair Treatment</Link>
                    <Link to="/history" onClick={() => setISOpen(false)} className="hover:text-gray-400">Booking History</Link>
                    <Link to="/about" onClick={() => setISOpen(false)} className="hover:text-gray-400">About Us</Link>
                    <Link to="/login" onClick={() => setISOpen(false)} className="hover:text-gray-400">Login</Link>

                </div>
                
            </div>

        </nav>

     );
}

export default Navbar;