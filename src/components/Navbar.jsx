"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  const isHomepage = pathname === "/";


  useEffect(() => {

    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null
      if (stored) setUser(JSON.parse(stored))
    } catch (e) {
      console.error('Failed to parse user from localStorage', e)
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
      checkAuth();
    }
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      const response = await fetch('/api/auth/me', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        try { localStorage.setItem('user', JSON.stringify(data.user)) } catch (e) {}
      } else {
        setUser(null);
        try { localStorage.removeItem('token'); localStorage.removeItem('user') } catch (e) {}
      }
    } catch (error) {
      setUser(null);
      try { localStorage.removeItem('token'); localStorage.removeItem('user') } catch (e) {}
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      if (response.ok) {
        try { localStorage.removeItem('token'); localStorage.removeItem('user') } catch (e) {}
        setUser(null);
        toast.success('Logged out successfully');
        router.push('/');
        router.refresh();
      } else {
        toast.error('Failed to logout');
      }
    } catch (error) {
      toast.error('An error occurred during logout');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className={`max-w-7xl mx-auto px-4 ${scrolled ? 'py-3' : 'py-5'} flex items-center justify-between`}>
        
        <Link href="/" className={`font-bold ${scrolled ? 'text-xl text-blue-600' : (isHomepage ? 'text-2xl text-white' : 'text-2xl text-blue-600')}`}>StayKaro</Link>

        
        <div className="hidden md:flex items-center w-full justify-between">
          
          <div className="flex-1 flex justify-center space-x-6">
            <Link href="/" className={`${scrolled ? 'text-base text-gray-700 hover:text-blue-600' : (isHomepage ? 'text-lg text-white hover:text-blue-200' : 'text-lg text-gray-700 hover:text-blue-600')}`}>Home</Link>
            <Link href="/about" className={`${scrolled ? 'text-base text-gray-700 hover:text-blue-600' : (isHomepage ? 'text-lg text-white hover:text-blue-200' : 'text-lg text-gray-700 hover:text-blue-600')}`}>About</Link>
            <Link href="/services" className={`${scrolled ? 'text-base text-gray-700 hover:text-blue-600' : (isHomepage ? 'text-lg text-white hover:text-blue-200' : 'text-lg text-gray-700 hover:text-blue-600')}`}>Services</Link>
            <Link href="/blog" className={`${scrolled ? 'text-base text-gray-700 hover:text-blue-600' : (isHomepage ? 'text-lg text-white hover:text-blue-200' : 'text-lg text-gray-700 hover:text-blue-600')}`}>Blog</Link>
          </div>

          
          <div className="flex items-center space-x-3">
            {loading ? (
              <div className={`px-4 py-2 ${scrolled ? 'text-gray-600' : (isHomepage ? 'text-white' : 'text-gray-600')}`}>
                Loading...
              </div>
            ) : user ? (
              <>
                <div className={`flex items-center space-x-2 px-3 py-2 rounded ${scrolled ? 'text-gray-700' : (isHomepage ? 'text-white' : 'text-gray-700')}`}>
                  <User size={18} />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded transition flex items-center space-x-2 ${scrolled ? 'bg-red-600 text-white hover:bg-red-700' : (isHomepage ? 'bg-white text-black hover:bg-gray-200' : 'bg-red-600 text-white hover:bg-red-700')}`}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`px-4 py-2 rounded transition ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : (isHomepage ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700')}`}
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className={`px-4 py-2 rounded transition ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : (isHomepage ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700')}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>


        
        <div className="md:hidden">
          <button onClick={toggleMenu} className={scrolled ? 'text-gray-700' : (isHomepage ? 'text-white' : 'text-gray-700')}>
            {isOpen ? <X size={scrolled ? 28 : 32} /> : <Menu size={scrolled ? 28 : 32} />}
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className={`md:hidden px-6 pb-4 space-y-4 ${scrolled ? 'pt-2 bg-white' : (isHomepage ? 'pt-3 bg-black bg-opacity-80' : 'pt-3 bg-white')}`}>
          <Link href="/" onClick={toggleMenu} className={`block ${scrolled ? 'text-base text-gray-700' : (isHomepage ? 'text-lg text-white' : 'text-lg text-gray-700')}`}>
            Home
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className={`block ${scrolled ? 'text-base text-gray-700' : (isHomepage ? 'text-lg text-white' : 'text-lg text-gray-700')}`}
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={toggleMenu}
            className={`block ${scrolled ? 'text-base text-gray-700' : (isHomepage ? 'text-lg text-white' : 'text-lg text-gray-700')}`}
          >
            Services
          </Link>
          <Link
            href="/blog"
            onClick={toggleMenu}
            className={`block ${scrolled ? 'text-base text-gray-700' : (isHomepage ? 'text-lg text-white' : 'text-lg text-gray-700')}`}
          >
            Blog
          </Link>
          {loading ? (
            <div className={`block ${scrolled ? 'text-base text-gray-600' : (isHomepage ? 'text-lg text-white' : 'text-lg text-gray-600')}`}>
              Loading...
            </div>
          ) : user ? (
            <>
              <div className={`flex items-center space-x-2 px-3 py-2 ${scrolled ? 'text-gray-700' : (isHomepage ? 'text-white' : 'text-gray-700')}`}>
                <User size={18} />
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className={`block w-full text-left flex items-center space-x-2 ${scrolled ? 'text-red-600 hover:text-red-800' : (isHomepage ? 'text-red-300 hover:text-white' : 'text-red-600 hover:text-red-800')}`}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={toggleMenu}
                className={`block ${scrolled ? 'text-blue-600 hover:text-blue-800' : (isHomepage ? 'text-blue-300 hover:text-white' : 'text-blue-600 hover:text-blue-800')}`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={toggleMenu}
                className={`block ${scrolled ? 'text-blue-600 hover:text-blue-800' : (isHomepage ? 'text-blue-300 hover:text-white' : 'text-blue-600 hover:text-blue-800')}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
