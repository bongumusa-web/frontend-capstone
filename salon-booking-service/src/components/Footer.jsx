import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      
      {/* Main Footer Content */}
      <div className="px-6 grid gap-10 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto text-center py-8 px-10">

        {/* Explore Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-pink-400">Explore</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/haircut" className="hover:text-gray-300">Hair Cut</Link></li>
            <li><Link to="/nail" className="hover:text-gray-300">Nail Service</Link></li>
            <li><Link to="/treatment" className="hover:text-gray-300">Hair Treatment</Link></li>
            <li><Link to="/history" className="hover:text-gray-300">Booking History</Link></li>
            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-pink-400">Contact Us</h2>
          <p>Address: 123 Main Street, Johannesburg</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: info@musasalon.com</p>

          {/* Social Media */}
          <div className="mt-4 flex justify-center md:justify-start space-x-4 text-2xl">
            <FaFacebook className="hover:text-gray-400 cursor-pointer" />
            <FaTwitter className="hover:text-gray-400 cursor-pointer" />
            <FaInstagram className="hover:text-gray-400 cursor-pointer" />
            <FaTiktok className="hover:text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Operating Hours Section */}
        <div className="text-center  md:text-left md:ml-10" >
          <h2 className="text-lg font-semibold mb-4 text-pink-400">Operating Hours</h2>
          <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
          <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
          <p>Public Holidays: 10:00 AM - 4:00 PM</p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-700 mt-8 pt-4 text-sm">
        © {new Date().getFullYear()} Musa's Salon. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
