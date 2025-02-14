// src/App.js
import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentData, setCurrentData] = useState({
    location: 'Agromediteranski fakultet',
    institution: 'Univerzitet "Džemal Bijedić"',
    date: '13.05.2024',
    time: '18:30 h',
    temperature: 13.2,
    pressure: 1001,
    humidity: 50,
    parameters: [
      { name: 'CO', value: 0.2, unit: 'mg/m3' },
      { name: 'NO2', value: 18.3, unit: 'µg/m3' },
      { name: 'O3', value: 22.2, unit: 'µg/m3' },
      { name: 'SO2', value: 0.1, unit: 'µg/m3' },
      { name: 'PM1', value: 5, unit: 'µg/m3' },
      { name: 'PM2.5', value: 7, unit: 'µg/m3' },
      { name: 'PM10', value: 10, unit: 'µg/m3' }
    ]
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Simuliramo osvježavanje podataka
      setLastUpdate(new Date());
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Greška:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Kvaliteta zraka</h1>
            <button 
              onClick={refreshData} 
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Osvježavanje...' : 'Osvježi'}
            </button>
          </div>
          
          <div className="text-center text-gray-600 mt-4">
            <p>{currentData.location}</p>
            <p>{currentData.institution}</p>
            <p className="text-sm mt-2">
              Zadnje osvježavanje: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Datum i vrijeme</div>
                <div className="text-lg font-semibold">
                  {currentData.date} {currentData.time}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Temperatura</div>
                <div className="text-lg font-semibold">{currentData.temperature}°C</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Pritisak</div>
                <div className="text-lg font-semibold">{currentData.pressure} kPa</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Vlažnost</div>
                <div className="text-lg font-semibold">{currentData.humidity}%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentData.parameters.map((param) => (
                <div key={param.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">{param.name}</div>
                  <div className="text-lg font-semibold">
                    {param.value} {param.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;