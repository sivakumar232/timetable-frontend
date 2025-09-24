import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, 
  BookOpen, 
  Clock, 
  Users, 
  Calendar, 
  Sun, 
  Moon, 
  LogOut, 
  Settings, 
  Search, 
  ArrowLeft,
  GraduationCap,
  Award,
  UserCheck,
  Building2,
  ChevronDown,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// --- Data Store ---
const facultyData = [
  { id: 1, name: 'Dr P Ravi Kiran Varma', department: 'CSE', designation: 'Professor', workload: 8, subject: 'Deep Learning', experience: '15+ years', specialization: 'AI/ML', email: 'ravi.varma@college.edu', phone: '+91 9876543210' },
  { id: 2, name: 'Dr. Bh V S Rama Krishnam Raju', department: 'CSE', designation: 'Professor', workload: 8, subject: 'Natural Language Processing', experience: '12+ years', specialization: 'NLP/AI', email: 'rama.raju@college.edu', phone: '+91 9876543211' },
  { id: 3, name: 'Dr. M S V S Bhadri Raju', department: 'CSE', designation: 'Professor', workload: 8, subject: 'Tinkering Lab', experience: '14+ years', specialization: 'Innovation Labs', email: 'bhadri.raju@college.edu', phone: '+91 9876543212' },
  { id: 4, name: 'Dr. K V Krishnam Raju', department: 'CSE', designation: 'Professor', workload: 8, subject: 'Deep Learning Lab', experience: '13+ years', specialization: 'Deep Learning', email: 'krishnam.raju@college.edu', phone: '+91 9876543213' },
  { id: 5, name: 'Dr. G Mahesh', department: 'CSE', designation: 'Professor', workload: 8, subject: 'Computer Networks', experience: '16+ years', specialization: 'Networks', email: 'g.mahesh@college.edu', phone: '+91 9876543214' },
  { id: 6, name: 'Dr. V Chandra Sekhar', department: 'CSE', designation: 'Professor', workload: 8, subject: 'Full Stack Development -2', experience: '11+ years', specialization: 'Web Development', email: 'chandra.sekhar@college.edu', phone: '+91 9876543215' },
  { id: 7, name: 'Dr. N K Kameswara Rao', department: 'CSE', designation: 'Associate Professor', workload: 16, subject: 'Employability Skills', experience: '10+ years', specialization: 'Soft Skills', email: 'kameswara.rao@college.edu', phone: '+91 9876543216' },
  { id: 8, name: 'Dr. R N V Jagan Mohan', department: 'CSE', designation: 'Associate Professor', workload: 16, subject: 'Professional Elective-I', experience: '9+ years', specialization: 'Electives', email: 'jagan.mohan@college.edu', phone: '+91 9876543217' },
  { id: 9, name: 'Dr. G N V G Sirisha', department: 'CSE', designation: 'Associate Professor', workload: 16, subject: 'deep learning', experience: '8+ years', specialization: 'Machine Learning', email: 'sirisha@college.edu', phone: '+91 9876543218' },
  { id: 10, name: 'Dr. P Bharat Siva Varma', department: 'CSE', designation: 'Associate Professor', workload: 16, subject: 'Evaluation of Community Service Internship', experience: '7+ years', specialization: 'Community Service', email: 'bharat.varma@college.edu', phone: '+91 9876543219' },
  { id: 11, name: 'Dr. M Srihari Varma', department: 'CSE', designation: 'Associate Professor', workload: 16, subject: 'Natural Language Processing Lab', experience: '8+ years', specialization: 'NLP Research', email: 'srihari.varma@college.edu', phone: '+91 9876543220' },
  { id: 12, name: 'Dr. V MNSSVKR Gupta', department: 'CSE', designation: 'Associate Professor', workload: 16, subject: 'Deep Learning', experience: '9+ years', specialization: 'Neural Networks', email: 'gupta@college.edu', phone: '+91 9876543221' },
  { id: 13, name: 'Dr. K Aruna Kumari', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Computer Networks', experience: '6+ years', specialization: 'Network Security', email: 'aruna.kumari@college.edu', phone: '+91 9876543222' },
  { id: 14, name: 'Dr. K.V. Nagendra', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Natural Language Processing', experience: '5+ years', specialization: 'Text Analytics', email: 'nagendra@college.edu', phone: '+91 9876543223' },
  { id: 15, name: 'Smt. V Priya Darshini', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Professional Elective-I', experience: '4+ years', specialization: 'Programming', email: 'priya.darshini@college.edu', phone: '+91 9876543224' },
  { id: 16, name: 'Dr. J Rajani Kanth', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Open Elective-I', experience: '6+ years', specialization: 'Interdisciplinary', email: 'rajani.kanth@college.edu', phone: '+91 9876543225' },
  { id: 17, name: 'Smt. T V S S S Lakshmi', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Deep Learning Lab', experience: '3+ years', specialization: 'Practical AI', email: 'lakshmi@college.edu', phone: '+91 9876543226' },
  { id: 18, name: 'Sri. D S S N Raju', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Natural Language Processing Lab', experience: '4+ years', specialization: 'NLP Implementation', email: 'raju@college.edu', phone: '+91 9876543227' },
  { id: 19, name: 'Sri. N S S G Krishna', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Full Stack Development -2', experience: '5+ years', specialization: 'Web Technologies', email: 'krishna@college.edu', phone: '+91 9876543228' },
  { id: 20, name: 'Sri. R B V Subramanyam', department: 'CSE', designation: 'Assistant Professor', workload: 24, subject: 'Tinkering Lab', experience: '3+ years', specialization: 'Innovation', email: 'subramanyam@college.edu', phone: '+91 9876543229' }
];

// --- Timetable Generation Logic ---
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const generateMockTimetable = (workload, subject) => {
    let weeklyTimetable = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
    let hours = workload;
    
    const classes = [];
    while (hours > 0) {
        const classLength = (hours > 1 && Math.random() > 0.4) ? 2 : 1;
        classes.push({
            subject,
            room: `${subject.includes('Lab') ? 'Lab' : 'A'}-${Math.floor(100 + Math.random() * 400)}`,
            span: classLength
        });
        hours -= classLength;
    }

    classes.forEach(cls => {
        let placed = false;
        while(!placed){
            const day = days[Math.floor(Math.random() * days.length)];
            const timeSlotIndex = Math.floor(Math.random() * (timeSlots.length - (cls.span -1)));
            const time = timeSlots[timeSlotIndex];
            
            const isCollision = weeklyTimetable[day].some(existingCls => {
                const existingStartTime = timeSlots.indexOf(existingCls.time);
                const newStartTime = timeSlots.indexOf(time);
                return (newStartTime < existingStartTime + existingCls.span && newStartTime + cls.span > existingStartTime);
            });

            if(!isCollision){
                weeklyTimetable[day].push({ ...cls, time });
                placed = true;
            }
        }
    });
    
    for(const day in weeklyTimetable){
        weeklyTimetable[day].sort((a,b) => timeSlots.indexOf(a.time) - timeSlots.indexOf(b.time));
    }

    return weeklyTimetable;
};

// --- Professional Icon Component ---
const ProfessionalAvatar = ({ designation, name, size = "large" }) => {
    const sizeClasses = {
        small: "w-12 h-12",
        medium: "w-16 h-16", 
        large: "w-20 h-20"
    };
    
    const iconSize = {
        small: 20,
        medium: 28,
        large: 36
    };

    const getDesignationIcon = () => {
        if (designation.includes('Professor')) {
            return <GraduationCap size={iconSize[size]} className="text-white" />;
        }
        return <UserCheck size={iconSize[size]} className="text-white" />;
    };

    const getGradientClass = () => {
        if (designation === 'Professor') return 'from-purple-600 to-blue-600';
        if (designation === 'Associate Professor') return 'from-blue-600 to-cyan-600';
        return 'from-cyan-600 to-teal-600';
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getGradientClass()} flex items-center justify-center shadow-lg ring-4 ring-white/20`}>
            {getDesignationIcon()}
        </div>
    );
};

// --- Main App Component ---
function App() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleSelectFaculty = (faculty) => {
    setSelectedFaculty(faculty);
  };

  const handleBackToSelector = () => {
    setSelectedFaculty(null);
  };
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (selectedFaculty) {
    return (
      <FacultyDashboard
        faculty={selectedFaculty}
        onBack={handleBackToSelector}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    );
  } else {
    return (
      <FacultySelector
        allFaculty={facultyData}
        onSelect={handleSelectFaculty}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    );
  }
}

// --- Faculty Selector Screen ---
const FacultySelector = ({ allFaculty, onSelect, isDarkMode, toggleTheme }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedDesignation, setSelectedDesignation] = useState('All');

    const departments = ['All', ...new Set(allFaculty.map(f => f.department))];
    const designations = ['All', ...new Set(allFaculty.map(f => f.designation))];

    const filteredFaculty = useMemo(() => 
        allFaculty.filter(f => 
            f.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedDepartment === 'All' || f.department === selectedDepartment) &&
            (selectedDesignation === 'All' || f.designation === selectedDesignation)
        ), [searchTerm, selectedDepartment, selectedDesignation, allFaculty]
    );
        const handleLogout = () => {
        // Your logout logic goes here
        console.log("User is logging out...");
        // For example, clearing a token from local storage
        localStorage.removeItem('authToken'); 
        // Redirecting the user to the login page
        // If using react-router-dom:
        // navigate('/login');
    };

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-800'}`}>
            <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-md shadow-sm`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
      <div className="flex items-center justify-between h-16">
    
    <div className={`flex items-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <Brain size={32} className="text-cyan-600 mr-3" />
        IntelliTime<span className="text-cyan-600">AI</span>
        
    </div>
    
    <div className="flex items-center space-x-2"> {/* New container for buttons */}
        <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
        >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {/* Logout button to the right */}
        <button onClick={handleLogout} className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
        </button>
    </div>
</div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Faculty Directory
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Discover our distinguished faculty members and access their academic profiles
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className={`mb-8 p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text"
                                placeholder="Search faculty by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 outline-none transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            />
                        </div>
                        
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <select 
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className={`w-full pl-12 pr-10 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 outline-none transition-colors appearance-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            >
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        
                        <div className="relative">
                            <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <select 
                                value={selectedDesignation}
                                onChange={(e) => setSelectedDesignation(e.target.value)}
                                className={`w-full pl-12 pr-10 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 outline-none transition-colors appearance-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            >
                                {designations.map(designation => (
                                    <option key={designation} value={designation}>{designation === 'All' ? 'All Positions' : designation}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500">
                        Showing {filteredFaculty.length} of {allFaculty.length} faculty members
                    </div>
                </div>

                {/* Faculty Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFaculty.map(faculty => (
                        <FacultyCard 
                            key={faculty.id}
                            faculty={faculty}
                            onClick={() => onSelect(faculty)}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </div>

                {filteredFaculty.length === 0 && (
                    <div className="text-center py-12">
                        <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>🔍</div>
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No faculty found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                )}
            </main>
        </div>
    );
};

// --- Faculty Card Component ---
const FacultyCard = ({ faculty, onClick, isDarkMode }) => (
    <div 
        onClick={onClick}
        className={`group p-6 rounded-xl border cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-cyan-500/50' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-cyan-500/50 hover:shadow-cyan-500/10'}`}
    >
        <div className="flex flex-col items-center text-center">
            <div className="mb-4">
                <ProfessionalAvatar designation={faculty.designation} name={faculty.name} />
            </div>
            
            <h3 className={`font-bold text-lg mb-1 group-hover:text-cyan-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {faculty.name}
            </h3>
            
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                faculty.designation === 'Professor' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    : faculty.designation === 'Associate Professor'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
            }`}>
                <Award size={14} />
                {faculty.designation}
            </div>
            
            <div className="space-y-2 text-sm w-full">
                <div className={`flex items-center justify-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <BookOpen size={14} />
                    <span className="truncate">{faculty.subject}</span>
                </div>
                
                <div className={`flex items-center justify-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Building2 size={14} />
                    <span>{faculty.department}</span>
                </div>
                
                {faculty.experience && (
                    <div className={`flex items-center justify-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Clock size={14} />
                        <span>{faculty.experience}</span>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// --- Faculty Dashboard Screen ---
const FacultyDashboard = ({ faculty, onBack, isDarkMode, toggleTheme }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const timetable = useMemo(() => generateMockTimetable(faculty.workload, faculty.subject), [faculty]);

    const today = days[new Date().getDay() % 5];
    const todaySchedule = timetable[today] || [];
    
    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-800'}`}>
            {/* Header */}
            <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-md shadow-sm`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={onBack} 
                                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <h1 className={`text-xl font-semibold hidden md:block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Faculty Dashboard
                            </h1>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={toggleTheme} 
                                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="hover:ring-2 hover:ring-cyan-500 transition-all rounded-full"
                                >
                                    <ProfessionalAvatar 
                                        designation={faculty.designation} 
                                        name={faculty.name} 
                                        size="small" 
                                    />
                                </button>
                                
                                {isProfileOpen && (
                                    <div className={`absolute right-0 mt-2 w-72 rounded-xl shadow-lg py-2 ${isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-black ring-opacity-5'}`}>
                                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-3 mb-2">
                                                <ProfessionalAvatar 
                                                    designation={faculty.designation} 
                                                    name={faculty.name} 
                                                    size="small" 
                                                />
                                                <div>
                                                    <p className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {faculty.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {faculty.designation}
                                                    </p>
                                                </div>
                                            </div>
                                            {faculty.email && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                    <Mail size={12} />
                                                    <span className="truncate">{faculty.email}</span>
                                                </div>
                                            )}
                                            {faculty.phone && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Phone size={12} />
                                                    <span>{faculty.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="py-1">
                                            <a href="#" className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                                <GraduationCap size={16} /> 
                                                Academic Profile
                                            </a>
                                            <a href="#" className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                                <Settings size={16} /> 
                                                Settings
                                            </a>
                                        </div>
                                        
                                        <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                                            <button 
                                                onClick={onBack}
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-6 mb-6">
                        <ProfessionalAvatar 
                            designation={faculty.designation} 
                            name={faculty.name} 
                            size="large" 
                        />
                        <div>
                            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Welcome back, {faculty.name.split(' ')[1] || faculty.name}!
                            </h2>
                            <p className="text-lg text-gray-500 mt-1">
                                {faculty.designation} • {faculty.department} Department
                            </p>
                            {faculty.specialization && (
                                <p className={`text-sm mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full ${isDarkMode ? 'bg-cyan-900/30 text-cyan-300' : 'bg-cyan-100 text-cyan-800'}`}>
                                    <Award size={14} />
                                    Specialization: {faculty.specialization}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Demo Notice */}
                <div className={`text-sm p-4 mb-6 rounded-lg border ${isDarkMode ? 'bg-yellow-900/30 border-yellow-500/30 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
                    <strong>Demo Notice:</strong> The timetable and statistics shown are randomly generated for demonstration purposes based on your assigned workload and subject.
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        title="Assigned Subject" 
                        value={faculty.subject} 
                        icon={<BookOpen size={24} className="text-cyan-600" />} 
                        isDarkMode={isDarkMode}
                    />
                    <StatCard 
                        title="Weekly Workload" 
                        value={`${faculty.workload} hours`} 
                        icon={<Calendar size={24} className="text-green-600" />} 
                        isDarkMode={isDarkMode}
                    />
                    <StatCard 
                        title="Classes Today" 
                        value={todaySchedule.length} 
                        icon={<Clock size={24} className="text-orange-600" />} 
                        isDarkMode={isDarkMode}
                    />
                    <StatCard 
                        title="Department" 
                        value={faculty.department} 
                        icon={<Building2 size={24} className="text-purple-600" />} 
                        isDarkMode={isDarkMode}
                    />
                </div>

                {/* Tab Navigation */}
                <div className={`mb-8 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', label: 'Overview', icon: <Users size={16} /> },
                            { id: 'timetable', label: 'Timetable', icon: <Calendar size={16} /> },
                            { id: 'profile', label: 'Profile', icon: <GraduationCap size={16} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-cyan-500 text-cyan-600'
                                        : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Today's Schedule */}
                        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Today's Schedule ({today})
                            </h3>
                            {todaySchedule.length > 0 ? (
                                <div className="space-y-3">
                                    {todaySchedule.map((cls, index) => (
                                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg border-l-4 border-cyan-500 ${isDarkMode ? 'bg-gray-700' : 'bg-cyan-50'}`}>
                                            <div>
                                                <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {cls.subject}
                                                </div>
                                                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    Room: {cls.room}
                                                </div>
                                            </div>
                                            <div className={`text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <div className="font-medium">{cls.time}</div>
                                                <div className="text-xs">
                                                    {cls.span} hour{cls.span > 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>No classes scheduled for today</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <QuickActionCard
                                    title="Attendance"
                                    description="Mark student attendance"
                                    icon={<UserCheck size={24} />}
                                    isDarkMode={isDarkMode}
                                />
                                <QuickActionCard
                                    title="Assignments"
                                    description="Create and grade assignments"
                                    icon={<BookOpen size={24} />}
                                    isDarkMode={isDarkMode}
                                />
                                <QuickActionCard
                                    title="Schedule"
                                    description="View full schedule"
                                    icon={<Calendar size={24} />}
                                    isDarkMode={isDarkMode}
                                />
                                <QuickActionCard
                                    title="Resources"
                                    description="Access teaching materials"
                                    icon={<Building2 size={24} />}
                                    isDarkMode={isDarkMode}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'timetable' && (
                    <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Weekly Timetable
                        </h3>
                        <div className="overflow-x-auto">
                            <div className="min-w-full">
                                <div className="grid gap-px" style={{ gridTemplateColumns: `8rem repeat(${days.length}, minmax(120px, 1fr))` }}>
                                    <div className="sticky left-0"></div>
                                    {days.map(day => (
                                        <div key={day} className={`text-center font-semibold py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {day}
                                        </div>
                                    ))}
                                    
                                    {timeSlots.map(time => (
                                        <React.Fragment key={time}>
                                            <div className={`sticky left-0 pr-4 text-right text-sm h-16 flex items-center justify-end font-medium ${isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-white'}`}>
                                                {time}
                                            </div>
                                            {days.map(day => {
                                                const classInfo = timetable[day]?.find(c => c.time === time);
                                                if (classInfo) {
                                                    return (
                                                        <div key={`${day}-${time}`}
                                                             className="p-3 rounded-lg text-white text-xs leading-tight flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-600 shadow-sm border border-cyan-400"
                                                             style={{ 
                                                                 gridRow: `span ${classInfo.span || 1}`, 
                                                                 minHeight: `${(classInfo.span || 1) * 4}rem` 
                                                             }}>
                                                            <div className="font-bold text-sm mb-1">{classInfo.subject}</div>
                                                            <div className="opacity-90">{classInfo.room}</div>
                                                            <div className="opacity-75 text-xs mt-1">
                                                                {classInfo.span}h
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                const isCovered = timetable[day]?.some(c => {
                                                    const startIndex = timeSlots.indexOf(c.time);
                                                    const currentIndex = timeSlots.indexOf(time);
                                                    return currentIndex > startIndex && currentIndex < startIndex + c.span;
                                                });
                                                return isCovered ? null : (
                                                    <div key={`${day}-${time}`} className={`h-16 border rounded ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50/50'}`}></div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="space-y-8">
                        {/* Personal Information */}
                        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full Name</label>
                                        <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.name}</p>
                                    </div>
                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Designation</label>
                                        <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.designation}</p>
                                    </div>
                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Department</label>
                                        <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.department}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {faculty.email && (
                                        <div>
                                            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                                            <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.email}</p>
                                        </div>
                                    )}
                                    {faculty.phone && (
                                        <div>
                                            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</label>
                                            <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.phone}</p>
                                        </div>
                                    )}
                                    {faculty.experience && (
                                        <div>
                                            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Experience</label>
                                            <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.experience}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Academic Details */}
                        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Academic Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Primary Subject</label>
                                    <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.subject}</p>
                                </div>
                                <div>
                                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Weekly Workload</label>
                                    <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.workload} hours</p>
                                </div>
                                {faculty.specialization && (
                                    <div className="md:col-span-2">
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Area of Specialization</label>
                                        <p className={`mt-1 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faculty.specialization}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

// --- Quick Action Card Component ---
const QuickActionCard = ({ title, description, icon, isDarkMode }) => (
    <div className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${isDarkMode ? 'bg-gray-600 text-cyan-400' : 'bg-white text-cyan-600'}`}>
            {icon}
        </div>
        <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
);

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, isDarkMode }) => (
    <div className={`p-6 rounded-xl border flex items-start gap-4 transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:shadow-gray-100'}`}>
        <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {title}
            </div>
            <div className={`text-2xl font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`} title={value}>
                {value}
            </div>
        </div>
    </div>
);

export default App;