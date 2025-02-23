import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-5 bg-white text-gray-800 py-12">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div>
 

            <h2 className="text-3xl font-semibold mb-3 text-gray-900">Heir<span className="text-orange-700">ly</span></h2>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="text-gray-600 space-y-2">
              <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-gray-900">Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-gray-900">Browse</Link></li>
              <li><Link to="/Login" className="hover:text-gray-900">Login</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <FaFacebook className="text-2xl" />
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <FaTwitter className="text-2xl" />
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <FaInstagram className="text-2xl" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Gaurav Dwivedi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
