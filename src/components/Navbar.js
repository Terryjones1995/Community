import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, ArrowRightIcon, UserAddIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 h-full bg-black p-4 flex flex-col justify-between w-16 md:w-40">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white md:hidden"
            >
                {isOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:flex-col md:space-y-8`}>
                <Link to="/" className="text-white flex items-center space-x-2 md:space-x-4">
                    <HomeIcon className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="hidden md:inline text-sm">Home</span>
                </Link>
                <Link to="/profile" className="text-white flex items-center space-x-2 md:space-x-4">
                    <UserIcon className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="hidden md:inline text-sm">Profile</span>
                </Link>
                <Link to="/login" className="text-white flex items-center space-x-2 md:space-x-4">
                    <ArrowRightIcon className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="hidden md:inline text-sm">Login</span>
                </Link>
                <Link to="/signup" className="text-white flex items-center space-x-2 md:space-x-4">
                    <UserAddIcon className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="hidden md:inline text-sm">Sign Up</span>
                </Link>
            </div>

            <div className={`mt-auto w-full ${isOpen ? 'block' : 'hidden'} md:block`}>
                <button className="bg-blue-500 text-white font-bold py-3 w-full rounded-full text-lg">
                    Post
                </button>

                <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg w-full mt-4">
                    <img src="/path/to/avatar.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mb-2" />
                    <p className="text-gray-400 text-sm">@username</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
