import React, { useState } from 'react';
import { personalities, prebuiltTimePeriods, platforms, tones } from '../Constants';

const ControlPanel = ({ onGenerate }) => {
  const [period, setPeriod] = useState('');
  const [eventType, setEventType] = useState('');
  const [platform, setPlatform] = useState('Twitter');
  const [tone, setTone] = useState('humorous');
  const [customPeriod, setCustomPeriod] = useState(true);
  
  
  const [selectedPersonalities, setSelectedPersonalities] = useState(
    personalities.filter(p => p.default).map(p => p.label)
  );
  
  const handlePersonalityToggle = (personality) => {
    if (selectedPersonalities.includes(personality)) {
      setSelectedPersonalities(selectedPersonalities.filter(p => p !== personality));
    } else {
      setSelectedPersonalities([...selectedPersonalities, personality]);
    }
  };
  
  const handlePrebuiltPeriodSelect = (value) => {
    setPeriod(value);
    setCustomPeriod(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!period.trim()) {
      alert('Please enter a time period or select one from the prebuilt options');
      return;
    }
    
    onGenerate({
      period,
      eventType,
      platform,
      tone,
      selectedPersonalities
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Time Machine Controls</h2>
      
      <div className="mb-6">
        <div className="flex mb-4">
          <button
            onClick={() => setCustomPeriod(false)}
            className={`px-4 py-2 rounded-l-lg ${!customPeriod 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Prebuilt Eras
          </button>
          <button
            onClick={() => setCustomPeriod(true)}
            className={`px-4 py-2 rounded-r-lg ${customPeriod 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Custom Era
          </button>
        </div>
        
        {customPeriod ? (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Custom Time Period</label>
            <input
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="e.g., 1800s, Ancient Rome, 1969"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Time Period</label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-300">
              {prebuiltTimePeriods.map(era => (
                <button
                  key={era.id}
                  onClick={() => handlePrebuiltPeriodSelect(era.value)}
                  className={`text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    period === era.value 
                      ? 'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500' 
                      : 'bg-gray-50 hover:bg-indigo-50 text-gray-700'
                  }`}
                >
                  {era.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Type (Optional)</label>
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            placeholder="e.g., war, invention, disaster"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Platform Style</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition duration-200"
            >
              {platforms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition duration-200"
            >
              {tones.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Personalities</label>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              {personalities.map(personality => (
                <div key={personality.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={personality.id}
                    checked={selectedPersonalities.includes(personality.label)}
                    onChange={() => handlePersonalityToggle(personality.label)}
                    className="mr-2 h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={personality.id} className="text-sm">{personality.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">⏳</span>
            Generate Timeline
          </div>
        </button>
      </form>
    </div>
  );
};

export default ControlPanel;