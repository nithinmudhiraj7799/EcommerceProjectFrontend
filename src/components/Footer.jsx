import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4">About Us</h3>
          <p className="text-sm">
            Your trusted health & wellness store. Quality products, fast delivery,
            and excellent customer service.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Contact Us</a></li>
            <li><a href="/" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="/" className="hover:text-white">FAQs</a></li>
            <li><a href="/" className="hover:text-white">Shipping Info</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Shop All Products</a></li>
            <li><a href="/" className="hover:text-white">Wishlist</a></li>
            <li><a href="/" className="hover:text-white">View Cart</a></li>
            <li><a href="/" className="hover:text-white">My Account</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <i className="fab fa-facebook"></i> {/* If using FontAwesome */}
              {/* Or use SVG icons */}
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.8v-6.9h-3v-2.9h3V9.8c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-2 1-2 2v2.2h3.4l-.5 2.9h-2.9v6.9A10 10 0 0022 12z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-2.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14.86A4.48 4.48 0 0022.4.4a9 9 0 01-2.84 1.08A4.52 4.52 0 0016.15 0c-2.5 0-4.5 2-4.5 4.5 0 .35.04.7.1 1.03A12.85 12.85 0 013 1.1a4.49 4.49 0 001.4 6.04 4.38 4.38 0 01-2.05-.57v.06c0 2.22 1.58 4.06 3.7 4.48a4.52 4.52 0 01-2.04.07 4.5 4.5 0 004.2 3.14A9 9 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.85 12.78-12.78 0-.2 0-.43-.02-.64A9.15 9.15 0 0023 3z"/></svg>
            </a>
          </div>
          <p className="text-xs mt-6">&copy; {new Date().getFullYear()} YourStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
