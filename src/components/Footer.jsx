import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>Email: support@staykaro.com</li>
            <li>Phone: +91 89293 7204</li>
            <li><a href="#contact" className="hover: underline">Contact Form</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600"><FaLinkedinIn /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram /></a>
          </div>
        </div>

        <div className="md:col-span-1 mt-6 md:mt-0 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">StayKaro</h3>
          <p className="text-gray-400">© 2025 StayKaro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;