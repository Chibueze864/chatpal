"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="main-nav">
        <div className="container xl:max-w-6xl mx-auto px-4">
          <div className="lg:flex lg:justify-between">
            <div className="flex justify-between">
              <div className="mx-w-10 text-4xl font-bold capitalize text-gray-900 flex items-center">Tailone</div>
              <div className="flex flex-row items-center py-4 lg:py-0">
                <div className="relative text-gray-900 hover:text-black block lg:hidden">
                  <button type="button" className="menu-mobile block py-3 px-6 border-b-2 border-transparent" onClick={toggleMobileMenu}>
                    <span className="sr-only">Mobile menu</span>
                    {isMobileMenuOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="close bi bi-x-lg h-8 w-8" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                      </svg>
                    ) : (
                      <svg className="open h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-row">
              <ul className={`navbar bg-white lg:bg-transparent w-full ${isMobileMenuOpen ? '' : 'hidden'} text-center lg:text-left lg:flex lg:flex-row text-gray-900 text-sm items-center font-bold`}>
                <li className="relative hover:text-black">
                  <Link href="#hero" className="active block py-3 lg:py-7 px-6 border-b-2 border-transparent">Home</Link>
                </li>
                <li className="relative hover:text-black">
                  <Link href="#services" className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">What we do</Link>
                </li>
                <li className="relative hover:text-black">
                  <Link href="#portfolio" className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">Our works</Link>
                </li>
                <li className="relative hover:text-black">
                  <Link href="#clients" className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">Clients</Link>
                </li>
                <li className="relative hover:text-black">
                  <Link href="#team" className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">Team</Link>
                </li>
                <li className="relative hover:text-black">
                  <Link href="#contact" className="block py-3 lg:py-7 px-6 border-b-2 border-transparent">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;