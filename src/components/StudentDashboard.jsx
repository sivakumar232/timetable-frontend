import React, { useState, useEffect, useMemo } from 'react';
import { Bell, BookOpen, Sun, Moon, Coffee, CalendarClock, ChevronDown, Brain } from 'lucide-react';

// --- DATA ---
// Master list of all courses
const coursesMasterList = {
    "B23AM3101": { title: "Deep Learning", credits: 3, faculty: "Dr P Ravi Kiran Varma", type: "Theory" },
    "B23AM3102": { title: "Computer Networks", credits: 3, faculty: "Dr. M S V S Bhadri Raju", type: "Theory" },
    "B23AM3103": { title: "Natural Language Processing", credits: 3, faculty: "Dr. Bh V S Rama Krishnam Raju", type: "Theory" },
    "B23AM3110": { title: "Deep Learning Lab", credits: 1.5, faculty: "Dr P Ravi Kiran Varma", type: "Lab" },
    "B23AM3111": { title: "Natural Language Processing Lab", credits: 1.5, faculty: "Dr. Bh V S Rama Krishnam Raju", type: "Lab" },
    "B23AM3112": { title: "FSD-II Lab", credits: 1.5, faculty: "Dr. K V Krishnam Raju", type: "Lab" },
    "B23OE3101": { title: "Open Elective - I", credits: 3, faculty: "Various", type: "Theory" },
    "B23PE3101": { title: "PE-I (MOOCS)", credits: 3, faculty: "Self-Paced", type: "Theory" },
    "B23MC3101": { title: "H&M (Constitution)", credits: 0, faculty: "Dr. R N V Jagan Mohan", type: "Theory" },
    "B23SK3101": { title: "Employability Skills (VA)", credits: 1, faculty: "Mr. S. K. Varma", type: "Skill" },
    "B23SK3102": { title: "Employability Skills (QA)", credits: 1, faculty: "Ms. G. Lakshmi", type: "Skill" },
};

// --- TIMETABLE DATA FOR ALL SECTIONS (UPDATED) ---
const timetableDataAll = {
  "A": {
    "Monday": [
      { time: "09:00-12:00", code: "B23AM3111" }, // NLP LAB
      { time: "01:00-02:30", code: "B23AM3101" }, // DL
      { time: "02:30-04:00", code: "B23AM3102" }, // CN
    ],
    "Tuesday": [
      { time: "09:00-10:30", code: "B23PE3101" },  // PE-I
      { time: "10:30-12:00", code: "B23AM3101" }, // DL
      { time: "01:00-02:30", code: "B23AM3103" }, // NLP
      { time: "02:30-04:00", code: "B23SK3101" }, // ES(VA)
      { time: "04:00-04:30", text: "Counselling" },
    ],
    "Wednesday": [ // Common Day
      { time: "09:00-10:30", code: "B23OE3101" }, // OE-I
      { time: "10:30-12:00", code: "B23MC3101" }, // H&M
      { time: "01:00-04:00", code: "B23AM3112" }, // FSD-II LAB
    ],
    "Thursday": [
      { time: "09:00-10:30", code: "B23AM3102" }, // CN
      { time: "01:00-04:00", code: "B23AM3110" }, // DL LAB
    ],
    "Friday": [
      { time: "09:00-10:30", code: "B23AM3103" }, // NLP
      { time: "10:30-12:00", code: "B23PE3101" },  // PE-I
      { time: "04:00-04:30", text: "Sports" },
    ],
    "Saturday": [
      { time: "09:00-10:30", code: "B23SK3102" }, // ES(QA)
    ]
  },
  "B": {
    "Monday": [
      { time: "09:00-10:30", code: "B23AM3101" }, // DL
      { time: "10:30-12:00", code: "B23AM3102" }, // CN
      { time: "01:00-04:00", code: "B23AM3110" }, // DL LAB
    ],
    "Tuesday": [
      { time: "09:00-10:30", code: "B23AM3103" }, // NLP
      { time: "10:30-12:00", code: "B23PE3101" }, // PE-I
      { time: "02:30-04:00", code: "B23SK3101" }, // ES(VA)
      { time: "04:00-04:30", text: "Counselling" },
    ],
    "Wednesday": [ // Common Day
      { time: "09:00-10:30", code: "B23OE3101" }, // OE-I
      { time: "10:30-12:00", code: "B23MC3101" }, // H&M
      { time: "01:00-04:00", code: "B23AM3112" }, // FSD-II LAB
    ],
    "Thursday": [
      { time: "09:00-12:00", code: "B23AM3111" }, // NLP LAB
      { time: "01:00-02:30", code: "B23AM3101" }, // DL
      { time: "02:30-04:00", code: "B23AM3102" }, // CN
    ],
    "Friday": [
      { time: "09:00-10:30", code: "B23PE3101" }, // PE-I
      { time: "10:30-12:00", code: "B23AM3103" }, // NLP
      { time: "04:00-04:30", text: "Sports" },
    ],
    "Saturday": [
      { time: "09:00-10:30", code: "B23SK3102" }, // ES(QA)
    ]
  },
  "C": {
    "Monday": [
      { time: "09:00-10:30", code: "B23AM3102" }, // CN
      { time: "10:30-12:00", code: "B23PE3101" },  // PE-I
      { time: "01:00-04:00", code: "B23AM3112" }, // FSD-II LAB
    ],
    "Tuesday": [
      { time: "09:00-12:00", code: "B23AM3110" }, // DL LAB
      { time: "01:00-02:30", code: "B23AM3103" }, // NLP
      { time: "02:30-04:00", code: "B23SK3101" }, // ES(VA)
      { time: "04:00-04:30", text: "Counselling" },
    ],
    "Wednesday": [ // Common Day
      { time: "09:00-10:30", code: "B23OE3101" }, // OE-I
      { time: "10:30-12:00", code: "B23MC3101" }, // H&M
    ],
    "Thursday": [
      { time: "09:00-10:30", code: "B23AM3101" }, // DL
      { time: "10:30-12:00", code: "B23AM3102" }, // CN
      { time: "01:00-04:00", code: "B23AM3111" }, // NLP LAB
    ],
    "Friday": [
      { time: "09:00-10:30", code: "B23AM3103" }, // NLP
      { time: "10:30-12:00", code: "B23AM3101" }, // DL
      { time: "01:00-02:30", code: "B23PE3101" },  // PE-I
      { time: "04:00-04:30", text: "Sports" },
    ],
    "Saturday": [
      { time: "09:00-10:30", code: "B23SK3102" }, // ES(QA)
    ]
  }
};


// --- MODIFIED Timetable Grid Component with New UI ---
const FullSchedule = ({ schedule, isDarkMode, courses }) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timeSlots = [
        { slot: "09:00-10:30", display: "09:00-10:30" }, { slot: "10:30-12:00", display: "10:30-12:00" },
        { slot: "01:00-02:30", display: "01:00-02:30" }, { slot: "02:30-04:00", display: "02:30-04:00" },
        { slot: "04:00-04:30", display: "04:00-04:30" },
    ];

    const timeToGrid = (time) => {
        const [start, end] = time.split('-');
        const startIndex = timeSlots.findIndex(slot => slot.slot.startsWith(start));
        let endIndex = timeSlots.findIndex(slot => slot.slot.endsWith(end));
        if (endIndex === -1) { endIndex = timeSlots.findIndex(s => s.slot.split('-')[1] === end); }
        const span = endIndex >= startIndex ? endIndex - startIndex + 1 : 1;
        return { start: startIndex, span: span };
    };
    
    const getTypeColor = (type, isSpecial = false) => {
        const baseClasses = 'p-3 rounded-lg shadow-md h-full flex flex-col justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl';
        if (isSpecial) {
            return isDarkMode 
            ? `${baseClasses} bg-purple-900/70 border-2 border-purple-600/50 text-purple-100 hover:border-purple-400`
            : `${baseClasses} bg-purple-100 border-2 border-purple-300 text-purple-800 hover:border-purple-400`;
        }
        if (isDarkMode) {
            switch (type) {
                case 'Lab': return `${baseClasses} bg-cyan-900/70 border-2 border-cyan-600/50 text-cyan-100 hover:border-cyan-400`;
                case 'Skill': return `${baseClasses} bg-amber-900/70 border-2 border-amber-600/50 text-amber-100 hover:border-amber-400`;
                default: return `${baseClasses} bg-gray-700/80 border-2 border-gray-600/50 text-gray-100 hover:border-gray-400`;
            }
        }
        switch (type) {
            case 'Lab': return `${baseClasses} bg-cyan-100 border-2 border-cyan-300 text-cyan-900 hover:border-cyan-400`;
            case 'Skill': return `${baseClasses} bg-amber-100 border-2 border-amber-300 text-amber-900 hover:border-amber-400`;
            default: return `${baseClasses} bg-slate-100 border-2 border-slate-300 text-slate-900 hover:border-slate-400`;
        }
    };

    const getCourseAbbr = (title) => {
        if (!title) return '';
        const abbr = {
            'Deep Learning': 'DL', 'Computer Networks': 'CN', 'Natural Language Processing': 'NLP',
            'Deep Learning Lab': 'DL LAB', 'Natural Language Processing Lab': 'NLP LAB', 'FSD-II Lab': 'FSD-2 LAB',
            'Open Elective - I': 'OE-I', 'PE-I (MOOCS)': 'PE-I', 'H&M (Constitution)': 'H&M',
            'Employability Skills (VA)': 'ES(VA)', 'Employability Skills (QA)': 'ES(QA)',
            'Sports': 'Sports', 'Counselling': 'Counselling'
        };
        return abbr[title] || title;
    };

    return (
        <div className={`rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-900/80 to-gray-800/80 border-2 border-gray-700' : 'bg-white/80 to-gray-50/80 border-2 border-gray-200'}`}>
            <div className={`grid grid-cols-[1fr,2fr,2fr,1fr,2fr,2fr,1.5fr] gap-2 mb-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="p-3 rounded-lg font-bold text-center">Day</div>
                {['09:00-10:30', '10:30-12:00'].map(t => <div key={t} className={`p-3 rounded-lg font-semibold text-center ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>{t}</div>)}
                <div className={`p-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 ${isDarkMode ? 'bg-gray-900 text-cyan-300' : 'bg-gray-200 text-cyan-700'}`}><Coffee size={16}/></div>
                {['01:00-02:30', '02:30-04:00', '04:00-04:30'].map(t => <div key={t} className={`p-3 rounded-lg font-semibold text-center ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>{t}</div>)}
            </div>
            
            <div className="space-y-3">
                {days.map((day) => {
                    const periods = schedule[day] || [];
                    const renderedSlots = new Array(timeSlots.length).fill(false);
                    periods.forEach(p => {
                        const { start, span } = timeToGrid(p.time);
                        for(let i=0; i < span; i++) {
                            if (start + i < renderedSlots.length) renderedSlots[start + i] = true;
                        }
                    });

                    return (
                        <div key={day} className="grid grid-cols-[1fr,2fr,2fr,1fr,2fr,2fr,1.5fr] gap-2 items-center min-h-[5rem]">
                            <div className={`h-full flex items-center justify-center rounded-lg font-bold text-center ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'}`}>
                                {day.substring(0,3)}
                            </div>
                            <div className="col-start-2 col-span-2 grid grid-cols-2 gap-2 h-full">
                                {renderedSlots.slice(0, 2).map((isRendered, i) => !isRendered && <div key={i} className={`rounded-lg border-2 border-dashed ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} bg-black/5`}></div>)}
                            </div>
                            <div className="h-full"></div>
                            <div className="col-start-5 col-span-3 grid grid-cols-3 gap-2 h-full">
                                {renderedSlots.slice(2, 5).map((isRendered, i) => !isRendered && <div key={i} className={`rounded-lg border-2 border-dashed ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} bg-black/5`}></div>)}
                            </div>
                            {periods.map(period => {
                                const course = period.code ? courses[period.code] : null;
                                const gridPos = timeToGrid(period.time);
                                if (gridPos.start === -1) return null;
                                const colStart = gridPos.start < 2 ? gridPos.start + 2 : gridPos.start + 3;
                                let colSpan = gridPos.span;
                                if(gridPos.start < 2 && (gridPos.start + gridPos.span) > 2) { colSpan += 1; }
                                return (
                                    <div key={`${day}-${period.time}`} className="text-center h-full" style={{ gridColumn: `${colStart} / span ${colSpan}` }}>
                                        <div className={getTypeColor(course?.type, !course)}>
                                            <div className="font-bold text-sm leading-tight">{getCourseAbbr(course?.title || period.text)}</div>
                                            {course && (<div className="text-xs opacity-75 mt-1 truncate">{course.faculty.split(' ').slice(-2).join(' ')}</div>)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                <div className="flex flex-wrap gap-4 justify-center text-xs">
                    <div className="flex items-center gap-2"><div className={`w-4 h-4 rounded ${isDarkMode ? 'bg-slate-700 border border-slate-500' : 'bg-slate-100 border border-slate-300'}`} /><span>Theory</span></div>
                    <div className="flex items-center gap-2"><div className={`w-4 h-4 rounded ${isDarkMode ? 'bg-cyan-900 border border-cyan-600' : 'bg-cyan-100 border border-cyan-300'}`} /><span>Lab</span></div>
                    <div className="flex items-center gap-2"><div className={`w-4 h-4 rounded ${isDarkMode ? 'bg-amber-900 border border-amber-600' : 'bg-amber-100 border border-amber-300'}`} /><span>Skill</span></div>
                    <div className="flex items-center gap-2"><div className={`w-4 h-4 rounded ${isDarkMode ? 'bg-purple-900 border border-purple-600' : 'bg-purple-100 border border-purple-300'}`} /><span>Activities</span></div>
                </div>
            </div>
        </div>
    );
};


// The rest of the StudentDashboard component remains the same.
function StudentDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState('B'); // Default to B
  const [activeTab, setActiveTab] = useState('schedule');
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const currentTimetable = timetableDataAll[selectedSection];
  const enrolledCourses = useMemo(() => {
    const courses = new Set();
    Object.values(currentTimetable).flat().forEach(period => {
      if (period.code) courses.add(period.code);
    });
    // Sorting by title for consistency
    return Array.from(courses).map(code => ({ code, ...coursesMasterList[code] })).sort((a,b) => a.title.localeCompare(b.title));
  }, [selectedSection]);

  const classStatus = { status: 'Up Next', class: { course: 'Computer Networks' }, time: '09:00 AM' };

  return (
    <div className={`min-h-screen font-sans transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-50 to-white text-gray-800'}`}>
      <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${isDarkMode ? 'bg-gray-900/90 border-gray-700 backdrop-blur-xl' : 'bg-white/90 border-gray-200 backdrop-blur-xl'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
    <div className="flex items-center gap-4">
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-cyan-600">
                <Brain size={18} className="text-white" />
            </div>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>IntelliTime<span className="text-cyan-600">AI</span></h1>
        </div>
        <div className="hidden md:flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <CalendarClock size={20} className="text-cyan-500 flex-shrink-0" />
            <div className="text-sm">
                <p>
                    <span className="font-bold text-green-500">Up Next:</span> {classStatus.class.course} at {classStatus.time}
                </p>
            </div>
        </div>
    </div>
    
    <div className="flex items-center gap-4">
        <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-200 text-gray-600'}`}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className={`p-2 rounded-full transition-all duration-200 relative ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        {/* Logout button to the right */}
        <button  className={`p-2 rounded-full transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
        </button>
    </div>
</div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 border-b border-gray-300 dark:border-gray-600">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button onClick={() => setActiveTab('schedule')} className={`${activeTab === 'schedule' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}>My Schedule</button>
                <button onClick={() => setActiveTab('courses')} className={`${activeTab === 'courses' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}>Course Selection</button>
            </nav>
        </div>
        <div>
            {activeTab === 'schedule' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">Full Schedule</h3>
                            <div className="relative">
                                <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className={`appearance-none rounded-md py-2 pl-3 pr-8 font-semibold border transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}>
                                    <option value="A">Section A</option>
                                    <option value="B">Section B</option>
                                    <option value="C">Section C</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                        <FullSchedule schedule={currentTimetable} isDarkMode={isDarkMode} courses={coursesMasterList}/>
                    </div>
                    <div className="space-y-8">
                        <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'}`}>
                            <h3 className="text-xl font-bold mb-4">📚 My Enrolled Courses (Sec-{selectedSection})</h3>
                            <div className="space-y-3 max-h-[40rem] overflow-y-auto pr-2">
                                {enrolledCourses.map(course => (
                                    <div key={course.code} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/70'}`}>
                                        <p className="font-semibold text-sm">{course.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.faculty}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'courses' && (
                 <div className="text-center py-10 text-gray-500"><p>Course selection will be available soon.</p></div>
            )}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;