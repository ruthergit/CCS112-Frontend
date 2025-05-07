import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Title */}
        <h1 className="text-xl font-bold">Patient Records</h1>

        {/* Navigation Links */}
        <div className="space-x-6">
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold' : 'hover:underline'
            }
          >
            Patients
          </NavLink>
          <NavLink
            to="/medical-records"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold' : 'hover:underline'
            }
          >
            Medical Records
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
