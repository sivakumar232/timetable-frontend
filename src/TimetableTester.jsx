import React, { useState, useEffect } from 'react';
import { Settings, Upload, Play, CheckCircle, AlertCircle, Download, Info, Clock, Calendar, Users } from 'lucide-react';

const API_URL = 'http://localhost:5000';

// Helper component for file inputs
const FileInput = ({ label, fileType, onFileChange, selectedFile }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    <input 
      type="file" 
      onChange={(e) => onFileChange(e, fileType)} 
      accept=".csv"
      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
    />
    {selectedFile && <p className="text-xs text-green-600 mt-1">Selected: {selectedFile.name}</p>}
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
        
        // Auto-calculate duration when times change
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
            className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        );
      case 'string':
        if (options) {
          return (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

const EnhancedTimetableGenerator = () => {
  // State management
  const [files, setFiles] = useState({});
  const [processedJson, setProcessedJson] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [finalTimetable, setFinalTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Welcome! Please upload your CSV files to begin.');
  const [error, setError] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferencesTemplate, setPreferencesTemplate] = useState(null);
  const [userPreferences, setUserPreferences] = useState({});
  const [generationParams, setGenerationParams] = useState({
    population_size: 30,
    generations: 50
  });

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
    setStatusMessage('Step 1/3: Uploading and converting CSV files...');
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
      setStatusMessage('Step 2/3: Conversion successful! Now validating data...');
      
      const validateResponse = await fetch(`${API_URL}/api/validate-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });
      const validateData = await validateResponse.json();
      setValidationResult(validateData);

      if (validateData.valid) {
        setStatusMessage('Step 2/3: Validation successful! You can now configure preferences and generate the timetable.');
      } else {
        setError(`Validation failed: ${validateData.errors.join(', ')}`);
        setStatusMessage('Step 2/3: Validation failed. Please check the errors below and upload corrected files.');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during conversion/validation';
      setError(`An error occurred: ${errorMessage}`);
      setStatusMessage('Process failed. Please see the error message.');
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
    setStatusMessage('Step 3/3: Generating timetable... This may take a few minutes. Please be patient.');

    // Prepare enhanced preferences with period and break configuration
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

    try {
      const generateResponse = await fetch(`${API_URL}/api/generate-timetable`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const generateData = await generateResponse.json();
      
      if (!generateData.success) {
        throw new Error(generateData.error);
      }
      
      setFinalTimetable(generateData.data);
      setStatusMessage('Step 3/3: Timetable generated successfully!');
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during timetable generation';
      setError(`Generation failed: ${errorMessage}`);
      setStatusMessage('An error occurred during timetable generation.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTimetable = () => {
    if (finalTimetable) {
      const dataStr = JSON.stringify(finalTimetable, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'nep_timetable.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
      <h1 className="text-3xl font-bold text-indigo-800 mb-2">NEP 2020 University Timetable Generator</h1>
      <p className="text-slate-600 mb-6">Generate NEP 2020 compliant timetables with customizable preferences, periods, and breaks.</p>

      {/* Step 1: File Upload */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
          <Upload className="mr-2" size={20} />
          Step 1: Upload CSV Files
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileInput label="1. Courses CSV File" fileType="courses_csv" onFileChange={handleFileChange} selectedFile={files.courses_csv} />
          <FileInput label="2. Faculty CSV File" fileType="faculty_csv" onFileChange={handleFileChange} selectedFile={files.faculty_csv} />
          <FileInput label="3. Classrooms CSV File" fileType="classrooms_csv" onFileChange={handleFileChange} selectedFile={files.classrooms_csv} />
          <FileInput label="4. Student Batches CSV File" fileType="batches_csv" onFileChange={handleFileChange} selectedFile={files.batches_csv} />
        </div>

        <button 
          onClick={handleConvertAndValidate} 
          disabled={isLoading || Object.keys(files).length < 4}
          className="mt-6 w-full px-5 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-800 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2" size={20} />
              Upload & Validate All Files
            </>
          )}
        </button>
      </div>

      {/* Step 2: Configuration */}
      {validationResult && validationResult.valid && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <Settings className="mr-2" size={20} />
            Step 2: Configure Schedule & Preferences
          </h3>
          
          {/* Period and Break Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PeriodConfiguration periods={periods} setPeriods={setPeriods} />
            <BreakConfiguration breaks={breaks} setBreaks={setBreaks} totalPeriods={periods.filter(p => p.type === 'regular').length} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-blue-700">
              Customize additional preferences to match your institution's requirements.
            </p>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Settings className="mr-2" size={16} />
              {showPreferences ? 'Hide' : 'Show'} Advanced Preferences
            </button>
          </div>

          {showPreferences && preferencesTemplate && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-h-96 overflow-y-auto border rounded-lg p-4 bg-white">
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
          )}

          <div className="mt-4 p-4 bg-white rounded border">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Users className="mr-2" size={16} />
              Generation Parameters
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Population Size</label>
                <input
                  type="number"
                  value={generationParams.population_size}
                  onChange={(e) => setGenerationParams(prev => ({...prev, population_size: parseInt(e.target.value) || 30}))}
                  min="10" max="100" step="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-400">Higher values = better quality, longer time</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Generations</label>
                <input
                  type="number"
                  value={generationParams.generations}
                  onChange={(e) => setGenerationParams(prev => ({...prev, generations: parseInt(e.target.value) || 50}))}
                  min="20" max="200" step="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-400">Higher values = better optimization, longer time</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Generate Timetable */}
      {validationResult && validationResult.valid && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <Play className="mr-2" size={20} />
            Step 3: Generate Timetable
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Your data has been successfully validated. Click below to generate the optimized timetable with your custom schedule configuration.
          </p>
          <button 
            onClick={handleGenerateTimetable} 
            disabled={isLoading}
            className="w-full px-5 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-800 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Timetable...
              </>
            ) : (
              <>
                <Play className="mr-2" size={20} />
                Generate NEP Compliant Timetable
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Status & Results */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
          <Info className="mr-2" size={20} />
          Status & Results
        </h3>
        
        {statusMessage && (
          <div className={`p-4 my-2 rounded-md font-medium flex items-center ${
            error ? 'bg-red-100 border border-red-300 text-red-800' : 'bg-blue-100 border border-blue-300 text-blue-800'
          }`}>
            {error ? <AlertCircle className="mr-2" size={20} /> : <Info className="mr-2" size={20} />}
            {statusMessage}
          </div>
        )}
        
        {error && !statusMessage.includes("Validation failed") && (
          <div className="p-4 my-2 rounded-md font-medium bg-red-100 border border-red-300 text-red-800 flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <strong>Error:</strong> {error}
          </div>
        )}

        {validationResult && validationResult.warnings && validationResult.warnings.length > 0 && (
          <div className="p-4 my-2 rounded-md bg-yellow-100 border border-yellow-300">
            <h5 className="font-semibold text-yellow-800 mb-2">Validation Warnings:</h5>
            <ul className="text-sm text-yellow-700 list-disc list-inside">
              {validationResult.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {finalTimetable && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-slate-700">Generated Timetable</h4>
              <button
                onClick={downloadTimetable}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
              >
                <Download className="mr-2" size={16} />
                Download JSON
              </button>
            </div>
            
            {/* Timetable Summary */}
            {finalTimetable.metadata && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-3 rounded border text-center">
                  <div className="text-2xl font-bold text-indigo-600">{finalTimetable.metadata.total_batches}</div>
                  <div className="text-sm text-gray-600">Batches</div>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <div className="text-2xl font-bold text-green-600">{finalTimetable.metadata.total_faculty}</div>
                  <div className="text-sm text-gray-600">Faculty</div>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <div className="text-2xl font-bold text-blue-600">{finalTimetable.metadata.total_courses}</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <div className="text-2xl font-bold text-purple-600">{finalTimetable.metadata.working_days}</div>
                  <div className="text-sm text-gray-600">Working Days</div>
                </div>
              </div>
            )}

            {/* Analytics */}
            {finalTimetable.analytics && (
              <div className="bg-white p-4 rounded border mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">Timetable Analytics</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p><strong>Fitness Score:</strong></p>
                    <p className="text-lg font-bold text-green-600">{finalTimetable.analytics.fitness_score?.toFixed(2)}/1000</p>
                  </div>
                  <div>
                    <p><strong>Faculty Conflicts:</strong></p>
                    <p className="text-lg font-bold text-red-600">{finalTimetable.analytics.constraint_violations?.faculty_conflicts || 0}</p>
                  </div>
                  <div>
                    <p><strong>Room Conflicts:</strong></p>
                    <p className="text-lg font-bold text-red-600">{finalTimetable.analytics.constraint_violations?.classroom_conflicts || 0}</p>
                  </div>
                  <div>
                    <p><strong>Workload Violations:</strong></p>
                    <p className="text-lg font-bold text-orange-600">{finalTimetable.analytics.constraint_violations?.workload_violations || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Timetable Display */}
      {finalTimetable && (
        <TimetableDisplay timetable={finalTimetable} />
      )}
    </div>
  );
};

export default EnhancedTimetableGenerator;