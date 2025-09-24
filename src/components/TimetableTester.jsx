import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Settings, Upload, Play, CheckCircle, FileDown, Save,AlertCircle, Download, Info, Clock, Calendar, Users, Check, ChevronRight } from 'lucide-react';
const API_URL = 'http://localhost:3001'
  
// Stepper Component
const Stepper = ({ currentStep, steps, onStepClick, canNavigateToStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      
      
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const canNavigate = canNavigateToStep(stepNumber);
        const isClickable = isCompleted || isActive;
        const isLast = index === steps.length - 1;

        return (
          <div key={stepNumber} className="flex items-center flex-1">
            {/* Step Circle */}
            <div 
              className={`relative flex items-center  justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'bg-green-500 border-green-500 text-white cursor-pointer hover:bg-green-600' 
                  : isActive 
                    ? 'bg-blue-500 border-blue-500 text-white cursor-pointer' 
                    : canNavigate
                      ? 'bg-yellow-100 border-yellow-400 text-yellow-700 cursor-pointer hover:bg-yellow-200'
                      : 'bg-white border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
              onClick={() => isClickable && onStepClick(stepNumber)}
              title={isClickable ? `Go to ${step.title}` : `Complete previous steps to unlock`}
            >
              {isCompleted ? (
                <Check size={16} />
              ) : (
                <span className="text-sm font-semibold">{stepNumber}</span>
              )}
            </div>

            {/* Step Info */}
            <div 
              className={`ml-3 flex-1 ${isClickable ? 'cursor-pointer' : ''}`}
              onClick={() => isClickable && onStepClick(stepNumber)}
            >
              <div className={`text-sm font-semibold transition-colors duration-200 ${
                isActive ? 'text-blue-600' : isCompleted ? 'text-green-600 hover:text-green-700' : canNavigate ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                {step.title}
              </div>
              <div className={`text-xs ${
                isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : canNavigate ? 'text-yellow-500' : 'text-gray-400'
              }`}>
                {step.description}
              </div>
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div className={`h-px bg-gray-300 flex-1 mx-4 transition-colors duration-200 ${
                isCompleted ? 'bg-green-500' : stepNumber === currentStep ? 'bg-blue-200' : ''
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Step Navigation Component
const StepNavigation = ({ currentStep, totalSteps, onNext, onPrev, onGenerate, canProceed, isLoading }) => {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>

      {currentStep < totalSteps ? (
        <button
          onClick={onNext}
          disabled={!canProceed || isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Next
              <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onGenerate}
          disabled={!canProceed || isLoading}
          className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <Play size={16} className="mr-2" />
              Generate Timetable
            </>
          )}
        </button>
      )}
    </div>
  );
};

// Helper component for file inputs
const FileInput = ({ label, fileType, onFileChange, selectedFile }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input 
      type="file" 
      onChange={(e) => onFileChange(e, fileType)} 
      accept="*/*" // This line allows all file types
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
    {selectedFile && (
      <div className="flex items-center mt-2 text-xs text-green-600">
        <CheckCircle size={14} className="mr-1" />
        Selected: {selectedFile.name}
      </div>
    )}
  </div>
);

// Period Configuration Component
const PeriodConfiguration = ({ periods, setPeriods }) => {
  const addPeriod = () => {
    const newPeriod = {
      id: periods.length + 1,
      name: `Period ${periods.length + 1}`,
      start_time: "09:00",
      end_time: "09:50",
      type: "regular",
      duration: 50
    };
    setPeriods([...periods, newPeriod]);
  };

  const removePeriod = (index) => {
    if (periods.length > 1) {
      setPeriods(periods.filter((_, i) => i !== index));
    }
  };

  const updatePeriod = (index, field, value) => {
    const updated = periods.map((period, i) => {
      if (i === index) {
        const newPeriod = { ...period, [field]: value };
        
        if (field === 'start_time' || field === 'end_time') {
          const start = new Date(`2000-01-01T${newPeriod.start_time}:00`);
          const end = new Date(`2000-01-01T${newPeriod.end_time}:00`);
          newPeriod.duration = Math.max(0, (end - start) / (1000 * 60));
        }
        
        return newPeriod;
      }
      return period;
    });
    setPeriods(updated);
  };

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-700 flex items-center">
          <Clock className="mr-2" size={16} />
          Period Configuration
        </h4>
        <button
          onClick={addPeriod}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Add Period
        </button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {periods.map((period, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center p-3 border rounded bg-gray-50">
            <div className="col-span-3">
              <input
                type="text"
                value={period.name}
                onChange={(e) => updatePeriod(index, 'name', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
                placeholder="Period name"
              />
            </div>
            
            <div className="col-span-2">
              <input
                type="time"
                value={period.start_time}
                onChange={(e) => updatePeriod(index, 'start_time', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
            
            <div className="col-span-2">
              <input
                type="time"
                value={period.end_time}
                onChange={(e) => updatePeriod(index, 'end_time', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
            
            <div className="col-span-2">
              <select
                value={period.type}
                onChange={(e) => updatePeriod(index, 'type', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
              >
                <option value="regular">Regular</option>
                <option value="lunch">Lunch</option>
                <option value="break">Break</option>
                <option value="assembly">Assembly</option>
              </select>
            </div>
            
            <div className="col-span-2">
              <span className="text-sm text-gray-600">{period.duration} min</span>
            </div>
            
            <div className="col-span-1">
              <button
                onClick={() => removePeriod(index)}
                disabled={periods.length <= 1}
                className="text-red-500 hover:text-red-700 disabled:text-gray-300"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Break Configuration Component
const BreakConfiguration = ({ breaks, setBreaks, totalPeriods }) => {
  const addBreak = () => {
    const newBreak = {
      id: breaks.length + 1,
      name: `Break ${breaks.length + 1}`,
      after_period: 1,
      duration: 15,
      type: "short"
    };
    setBreaks([...breaks, newBreak]);
  };

  const removeBreak = (index) => {
    setBreaks(breaks.filter((_, i) => i !== index));
  };

  const updateBreak = (index, field, value) => {
    const updated = breaks.map((brk, i) => 
      i === index ? { ...brk, [field]: value } : brk
    );
    setBreaks(updated);
  };

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-700 flex items-center">
          <Calendar className="mr-2" size={16} />
          Break Configuration
        </h4>
        <button
          onClick={addBreak}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Add Break
        </button>
      </div>
      
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {breaks.map((brk, index) => (
          <div key={index} className="grid grid-cols-10 gap-2 items-center p-3 border rounded bg-gray-50">
            <div className="col-span-3">
              <input
                type="text"
                value={brk.name}
                onChange={(e) => updateBreak(index, 'name', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
                placeholder="Break name"
              />
            </div>
            
            <div className="col-span-2">
              <select
                value={brk.after_period}
                onChange={(e) => updateBreak(index, 'after_period', parseInt(e.target.value))}
                className="w-full px-2 py-1 text-sm border rounded"
              >
                {Array.from({length: totalPeriods}, (_, i) => (
                  <option key={i} value={i + 1}>After Period {i + 1}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-2">
              <input
                type="number"
                value={brk.duration}
                onChange={(e) => updateBreak(index, 'duration', parseInt(e.target.value) || 15)}
                className="w-full px-2 py-1 text-sm border rounded"
                min="5"
                max="60"
                placeholder="Duration (min)"
              />
            </div>
            
            <div className="col-span-2">
              <select
                value={brk.type}
                onChange={(e) => updateBreak(index, 'type', e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
              >
                <option value="short">Short</option>
                <option value="lunch">Lunch</option>
                <option value="assembly">Assembly</option>
              </select>
            </div>
            
            <div className="col-span-1">
              <button
                onClick={() => removeBreak(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Preference input component
const PreferenceInput = ({ label, value, onChange, type, description, range, options }) => {
  const renderInput = () => {
    switch (type) {
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        );
      case 'integer':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            min={range ? range[0] : undefined}
            max={range ? range[1] : undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'float':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            step="0.1"
            min={range ? range[0] : undefined}
            max={range ? range[1] : undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'string':
        if (options) {
          return (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        }
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {description && (
          <span className="ml-1 text-xs text-gray-500 italic">({description})</span>
        )}
      </label>
      {renderInput()}
      {range && type !== 'boolean' && (
        <p className="text-xs text-gray-400 mt-1">
          Range: {range[0]} - {range[1]}
        </p>
      )}
    </div>
  );
};

// Timetable Display Component
const TimetableDisplay = ({ timetable }) => {
  const [selectedBatch, setSelectedBatch] = useState('');
  
  useEffect(() => {
    if (timetable?.timetables && Object.keys(timetable.timetables).length > 0) {
      setSelectedBatch(Object.keys(timetable.timetables)[0]);
    }
  }, [timetable]);

  if (!timetable?.timetables) return null;

  const batchNames = Object.keys(timetable.timetables);
  const selectedTimetableData = timetable.timetables[selectedBatch];

  return (
    <div className="bg-white border rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Generated Timetable</h4>
        {batchNames.length > 1 && (
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {batchNames.map(batch => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        )}
      </div>

      {selectedTimetableData && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Time</th>
                {selectedTimetableData.weekly_schedule.map(day => (
                  <th key={day.day} className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    {day.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedTimetableData.weekly_schedule[0]?.periods.map((_, periodIndex) => (
                <tr key={periodIndex} className={periodIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    {selectedTimetableData.weekly_schedule[0].periods[periodIndex].time}
                  </td>
                  {selectedTimetableData.weekly_schedule.map(day => {
                    const period = day.periods[periodIndex];
                    return (
                      <td key={`${day.day}-${periodIndex}`} className="border border-gray-300 px-2 py-2 text-center">
                        {period.type === 'lunch_break' ? (
                          <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm font-medium">
                            LUNCH BREAK
                          </div>
                        ) : period.type === 'free' ? (
                          <div className="text-gray-400 text-sm">Free</div>
                        ) : period.course ? (
                          <div className="text-xs">
                            <div className="font-semibold text-blue-800 mb-1">
                              {period.course.name}
                            </div>
                            <div className="text-gray-600">
                              {period.faculty.name}
                            </div>
                            <div className="text-gray-500">
                              {period.classroom.name}
                            </div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const StepperTimetableGenerator = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState({});
  const [processedJson, setProcessedJson] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [finalTimetable, setFinalTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [preferencesTemplate, setPreferencesTemplate] = useState(null);
  const [userPreferences, setUserPreferences] = useState({});
  const [generationParams, setGenerationParams] = useState({
    population_size: 30,
    generations: 50
  });
 const [isSaving, setIsSaving] = useState(false); // Add a new state for the save button

  // In StepperTimetableGenerator.jsx

  const handleSaveTimetable = async () => {
    if (!finalTimetable) {
      alert('Please generate a timetable before saving.');
      return;
    }

    // The prompt is no longer needed!
    // const timetableName = prompt(...); 

    setIsSaving(true);

    try {
      const payload = {
        timetableData: finalTimetable, // Send the whole timetable object
      };

      // Call the new backend route
      const response = await fetchWithAuth(`${API_URL}/api/timetables/save-batch`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to save timetables.');
      }

      alert(data.msg); // Show the success message from the server

    } catch (err) {
      console.error("Failed to save timetables:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };
    const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, { ...options, headers });
    return response;
  };
  // Period and break configuration
  const [periods, setPeriods] = useState([
    { id: 1, name: "Period 1", start_time: "09:00", end_time: "09:50", type: "regular", duration: 50 },
    { id: 2, name: "Period 2", start_time: "09:50", end_time: "10:40", type: "regular", duration: 50 },
    { id: 3, name: "Break", start_time: "10:40", end_time: "10:55", type: "break", duration: 15 },
    { id: 4, name: "Period 3", start_time: "10:55", end_time: "11:45", type: "regular", duration: 50 },
    { id: 5, name: "Period 4", start_time: "11:45", end_time: "12:35", type: "regular", duration: 50 },
    { id: 6, name: "Lunch Break", start_time: "12:35", end_time: "13:35", type: "lunch", duration: 60 },
    { id: 7, name: "Period 5", start_time: "13:35", end_time: "14:25", type: "regular", duration: 50 },
    { id: 8, name: "Period 6", start_time: "14:25", end_time: "15:15", type: "regular", duration: 50 }
  ]);

  const [breaks, setBreaks] = useState([
    { id: 1, name: "Morning Break", after_period: 2, duration: 15, type: "short" },
    { id: 2, name: "Lunch Break", after_period: 4, duration: 60, type: "lunch" }
  ]);

  const steps = [
    {
      title: "Upload Files",
      description: "Upload your CSV files"
    },
    {
      title: "Set Preferences",
      description: "Customize generation settings"
    },
    {
      title: "Generate & Review",
      description: "Create your timetable"
    }
  ];
  // Load preferences template on component mount
  useEffect(() => {
    loadPreferencesTemplate();
  }, []);

  const loadPreferencesTemplate = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user-preferences-template`);
      const data = await response.json();
      if (data.success) {
        setPreferencesTemplate(data.template);
        const defaults = {};
        Object.keys(data.template).forEach(key => {
          defaults[key] = data.template[key].value;
        });
        setUserPreferences(defaults);
      }
    } catch (err) {
      console.error('Failed to load preferences template:', err);
    }
  };

  const handleFileChange = (event, fileType) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [fileType]: selectedFile,
      }));
    }
  };

  const handlePreferenceChange = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConvertAndValidate = async () => {
    if (Object.keys(files).length < 4) {
      setError('Please select all four required CSV files.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setProcessedJson(null);
    setValidationResult(null);
    setFinalTimetable(null);
    
    const formData = new FormData();
    for (const key in files) { 
      formData.append(key, files[key]); 
    }

    try {
      const convertResponse = await fetch(`${API_URL}/api/convert-csv-to-json`, {
        method: 'POST',
        body: formData
      });
      const convertData = await convertResponse.json();
      
      if (!convertData.success) {
        throw new Error(convertData.error);
      }
      
      const jsonData = convertData.data;
      setProcessedJson(jsonData);
      
      const validateResponse = await fetch(`${API_URL}/api/validate-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });
      const validateData = await validateResponse.json();
      setValidationResult(validateData);

      if (validateData.valid) {
        setCurrentStep(2); // Move to next step automatically
      } else {
        setError(`Validation failed: ${validateData.errors.join(', ')}`);
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during conversion/validation';
      setError(`An error occurred: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTimetable = async () => {
    if (!validationResult?.valid || !processedJson) {
      setError('Cannot generate timetable. Please successfully convert and validate your files first.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    const enhancedPreferences = {
      ...userPreferences,
      periods_per_day: periods.filter(p => p.type === 'regular').length,
      period_configuration: periods,
      break_configuration: breaks,
      custom_schedule: true
    };

    const payload = {
      institution_data: processedJson,
      user_preferences: enhancedPreferences,
      generation_params: generationParams,
    };

// ... inside handleGenerateTimetable
try {
  // Use the new helper function
  const generateResponse = await fetchWithAuth(`${API_URL}/api/generate-timetable`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  // ...
      const generateData = await generateResponse.json();
      
      if (!generateData.success) {
        throw new Error(generateData.error);
      }
      
      setFinalTimetable(generateData.data);
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during timetable generation';
      setError(`Generation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

const downloadAsPDF = () => {
    // First, check if the necessary data exists
    if (!finalTimetable || !finalTimetable.timetables) {
      console.error("Download failed: Timetable data is not in the correct format.");
      alert("Error: Timetable data is not available to download.");
      return; 
    }

    // ---> THIS LINE WAS MISSING <---
    // Create the new PDF document before the loop starts.
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    try {
        // Now, loop through your data and add content to the 'doc'
        Object.entries(finalTimetable.timetables).forEach(([batchName, data], index) => {
          if (index > 0) {
            doc.addPage();
          }
          
          doc.setFontSize(18);
          doc.text(`Timetable for: ${batchName}`, 14, 22);

          const tableHead = [['Time', ...data.weekly_schedule.map(day => day.day)]];

          const tableBody = data.weekly_schedule[0].periods.map((_, periodIndex) => {
            const rowData = [data.weekly_schedule[0].periods[periodIndex].time];
            
            data.weekly_schedule.forEach(day => {
              const period = day.periods[periodIndex];
              let cellContent = '';

              if (period.type === 'lunch_break') {
                cellContent = 'LUNCH BREAK';
              } else if (period.course) {
                cellContent = `${period.course.name}\n${period.faculty.name}\n(${period.classroom.name})`;
              } else {
                cellContent = 'Free';
              }
              rowData.push(cellContent);
            });
            
            return rowData;
          });

          autoTable(doc,{
            head: tableHead,
            body: tableBody,
            startY: 30,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, halign: 'center', valign: 'middle' },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
          });
        });

        // Finally, save the document after the loop is finished
        doc.save(`timetables.pdf`);
    } catch (err) {
        console.error("An error occurred during PDF generation:", err);
        alert("An error occurred while creating the PDF. Please check the console for details.");
    }
  };
  const canNavigateToStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return true; // Can always go to step 1
      case 2:
        return validationResult?.valid; // Can go to step 2 if files are validated
      case 3:
        return validationResult?.valid; // Can go to step 3 if files are validated
      case 4:
        return validationResult?.valid; // Can go to step 4 if files are validated
      default:
        return false;
    }
  };

  const handleStepClick = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      setCurrentStep(stepNumber);
      setError(''); // Clear any errors when navigating
    } 
  };
const canProceedToNext = () => {
  switch (currentStep) {
    case 1:
      return Object.keys(files).length === 4;
    case 2:
      return true;
    case 3:
      return true;
    case 4:
      // Enable the final button only if validation passed in Step 1
      return validationResult?.valid;
    default:
      return false;
  }
};

  const handleNext = () => {
    if (currentStep === 1) {
      handleConvertAndValidate();
    } else if (canProceedToNext()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(''); // Clear errors when going back
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Upload className="mx-auto mb-4 text-blue-500" size={48} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Files</h2>
              <p className="text-gray-600">Please upload all four required CSV files to proceed with timetable generation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <FileInput label="1. Courses File" fileType="courses_csv" onFileChange={handleFileChange} selectedFile={files.courses_csv} />
              <FileInput label="2. Faculty  File" fileType="faculty_csv" onFileChange={handleFileChange} selectedFile={files.faculty_csv} />
              <FileInput label="3. Classrooms  File" fileType="classrooms_csv" onFileChange={handleFileChange} selectedFile={files.classrooms_csv} />
              <FileInput label="4. Student Batches  File" fileType="batches_csv" onFileChange={handleFileChange} selectedFile={files.batches_csv} />
            </div>

            {validationResult && validationResult.warnings && validationResult.warnings.length > 0 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h5 className="font-semibold text-yellow-800 mb-2">Validation Warnings:</h5>
                <ul className="text-sm text-yellow-700 list-disc list-inside">
                  {validationResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="mx-auto mb-4 text-blue-500" size={48} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Set Your Preferences</h2>
              <p className="text-gray-600">Customize the timetable generation parameters to match your institution's needs.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Generation Parameters */}
              <div className="p-6 bg-white rounded-lg border">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <Settings className="mr-2" size={18} />
                  Generation Parameters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Population Size</label>
                    <input
                      type="range"
                      min="10" max="100" step="10"
                      value={generationParams.population_size}
                      onChange={(e) => setGenerationParams(prev => ({...prev, population_size: parseInt(e.target.value)}))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Faster</span>
                      <span className="font-semibold">{generationParams.population_size}</span>
                      <span>Better Quality</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Generations</label>
                    <input
                      type="range"
                      min="20" max="200" step="10"
                      value={generationParams.generations}
                      onChange={(e) => setGenerationParams(prev => ({...prev, generations: parseInt(e.target.value)}))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Faster</span>
                      <span className="font-semibold">{generationParams.generations}</span>
                      <span>More Optimized</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Preferences */}
              {preferencesTemplate && (
                <div className="p-6 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                    <Settings className="mr-2" size={18} />
                    Advanced Preferences
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {Object.entries(preferencesTemplate).map(([key, template]) => (
                      <PreferenceInput
                        key={key}
                        label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        value={userPreferences[key]}
                        onChange={(value) => handlePreferenceChange(key, value)}
                        type={template.type}
                        description={template.description}
                        range={template.range}
                        options={template.options}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Play className="mx-auto mb-4 text-green-500" size={48} />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Generate & Review Timetable</h2>
              <p className="text-gray-600">Review your configuration and generate the optimized timetable.</p>
            </div>

            {/* Configuration Summary */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Upload size={16} className="mr-2" />
                  Data Status
                </h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Files Uploaded:</span>
                    <span className="font-semibold text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Validation:</span>
                    <span className="font-semibold text-green-600">✓ Passed</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Clock size={16} className="mr-2" />
                  Schedule Config
                </h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Teaching Periods:</span>
                    <span className="font-semibold">{periods.filter(p => p.type === 'regular').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Breaks:</span>
                    <span className="font-semibold">{breaks.length}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h5 className="font-semibold text-purple-800 mb-2 flex items-center">
                  <Settings size={16} className="mr-2" />
                  Generation
                </h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Population:</span>
                    <span className="font-semibold">{generationParams.population_size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Generations:</span>
                    <span className="font-semibold">{generationParams.generations}</span>
                  </div>
                </div>
              </div>
            </div>

            {!finalTimetable && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-dashed border-green-300 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ready to Generate Your Timetable</h3>
                  <p className="text-gray-600 mb-6">
                    All configurations are set. Click the button below to generate your optimized NEP 2020 compliant timetable.
                    This process may take a few minutes depending on your data complexity.
                  </p>
                  <div className="text-sm text-gray-500 bg-white p-3 rounded border">
                    <strong>Estimated Time:</strong> 2-5 minutes based on current settings
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {finalTimetable && (
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Generated Timetable</h3>
                    <button
                      onClick={handleSaveTimetable}
                      disabled={isSaving}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Save size={16} />
                      {isSaving ? 'Saving...' : 'Save Timetable'}
                    </button>
                                      <button
                      onClick={downloadAsPDF}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                    >
                      <FileDown size={16} />
                      Download PDF
                    </button>

                </div>
                
                {/* Timetable Summary */}
               {/* Timetable Display */}
                <TimetableDisplay timetable={finalTimetable} />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}


        {/* Stepper */}
        <div className="max-w-4xl mx-auto">
          <Stepper 
            currentStep={currentStep} 
            steps={steps} 
            onStepClick={handleStepClick}
            canNavigateToStep={canNavigateToStep}
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Step Content with Navigation Hint */}
            {currentStep > 1 && (
              <div className="mb-6 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                <div className="flex items-center">
                  <Info className="text-blue-500 mr-2" size={16} />
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> You can click on any completed step above to navigate back and make changes.
                  </p>
                </div>
              </div>
            )}

            {renderStepContent()}

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="text-red-500 mr-2" size={20} />
                  <h5 className="font-semibold text-red-800">Error</h5>
                </div>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            )}

            {/* Navigation */}
            <StepNavigation 
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={handleNext}
              onPrev={handlePrev}
              onGenerate={handleGenerateTimetable}
              canProceed={canProceedToNext()}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperTimetableGenerator;