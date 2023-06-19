import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 left-0 bottom-0 w-full">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              auctor eleifend sem, et condimentum lectus fringilla non.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="text-sm">
              <li>
                <a href="/" className="hover:text-white">
                  Technology
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Travel
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Food
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Fashion
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="text-sm">
              <li>Email: info@example.com</li>
              <li>Phone: 123-456-7890</li>
              <li>
                <a href="/">Contact Form</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6" />
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Your Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
