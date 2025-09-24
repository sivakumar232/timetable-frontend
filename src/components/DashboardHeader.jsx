// src/components/DashboardHeader.jsx
import React, { useState } from 'react';
import { Sun, Moon, LogOut, GraduationCap, Brain,UserCheck, Mail, Phone, Settings } from 'lucide-react';

// We'll keep this helper component in the same file for simplicity
const ProfessionalAvatar = ({ designation, size = "small" }) => {
    const sizeClasses = { small: "w-10 h-10", large: "w-20 h-20" };
    const iconSize = { small: 20, large: 36 };

    const getIcon = () => {
        if (designation?.includes('Professor')) {
            return <GraduationCap size={iconSize[size]} className="text-white" />;
        }
        return <UserCheck size={iconSize[size]} className="text-white" />;
    };

    const getGradient = () => {
        if (designation === 'Professor') return 'from-purple-600 to-blue-600';
        if (designation?.includes('Associate')) return 'from-blue-600 to-cyan-600';
        return 'from-cyan-600 to-teal-600';
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getGradient()} flex items-center justify-center shadow-md ring-2 ring-white/20`}>
            {getIcon()}
        </div>
    );
};


const DashboardHeader = ({ user, onLogout, isDarkMode, toggleTheme }) => {
  // State for managing the profile dropdown menu
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Capitalize the first letter of the role for the title
  const roleTitle = user?.role.charAt(0).toUpperCase() + user?.role.slice(1);

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
                         <div className={`flex items-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                             <Brain size={32} className="text-cyan-600 mr-3" />
                             IntelliTime<span className="text-cyan-600">AI</span>
                         </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <ProfessionalAvatar designation={user?.designation} size="small" />
              </button>
              
              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-72 origin-top-right rounded-xl shadow-lg py-2 ${isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-black ring-opacity-5'}`}
                >
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                  
                  {/* <div className="py-1">
                    <a href="#" className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <Settings size={16} /> 
                      Account Settings
                    </a>
                  </div> */}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                    {/* THIS IS THE REAL LOGOUT BUTTON */}
                    <button 
                      onClick={onLogout}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-gray-100'}`}
                    >
                      <LogOut size={16} /> 
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;