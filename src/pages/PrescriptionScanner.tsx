import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { prescriptions } from '../data/mockData';
import { Camera, Upload, CheckCircle, AlertTriangle, FileText, X } from 'lucide-react';

const PrescriptionScanner: React.FC = () => {
  const { theme } = useApp();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Prescription Scanner
        </h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Upload or scan prescriptions to automatically add medicines
        </p>
      </div>

      {/* Scanner Area */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-6`}>
        {!scanning && !scanComplete && (
          <div className="text-center py-12">
            <div className={`w-24 h-24 mx-auto rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-6`}>
              <Camera size={40} className="text-primary" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Scan a Prescription
            </h3>
            <p className={`text-sm mb-6 max-w-md mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Take a photo or upload an image of a prescription. Our AI will extract the medicines and add them to your schedule.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleScan}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                <Camera size={18} />
                Take Photo
              </button>
              <button
                onClick={handleScan}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium border ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                <Upload size={18} />
                Upload Image
              </button>
            </div>
          </div>
        )}

        {scanning && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse-soft">
              <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Scanning Prescription...
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Our AI is reading and extracting medicine information
            </p>
          </div>
        )}

        {scanComplete && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Scan Complete
                </h3>
              </div>
              <button
                onClick={() => { setScanComplete(false); }}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              </button>
            </div>

            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                We detected <strong>3 medicines</strong> from the prescription. Please review and confirm.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Amoxicillin', strength: '250mg', confidence: 96 },
                { name: 'Ibuprofen', strength: '400mg', confidence: 93 },
                { name: 'Omeprazole', strength: '20mg', confidence: 88 },
              ].map((med, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600/30' : 'bg-white border-gray-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {med.name}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {med.strength}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Confidence</p>
                      <p className={`text-sm font-bold ${med.confidence >= 90 ? 'text-green-500' : 'text-amber-500'}`}>
                        {med.confidence}%
                      </p>
                    </div>
                    <button className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-dark transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScanComplete(false)}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Confirm & Add All
            </button>
          </div>
        )}
      </div>

      {/* Previous Scans */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Previous Scans
        </h3>
        <div className="space-y-3">
          {prescriptions.map(rx => (
            <div
              key={rx.id}
              onClick={() => setSelectedPrescription(rx.id)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                selectedPrescription === rx.id
                  ? theme === 'dark' ? 'border-primary/50 bg-primary/5' : 'border-primary/30 bg-primary/5'
                  : theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                  <FileText size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <div>
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {rx.doctor}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {rx.medicines.length} medicines • {rx.date}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                rx.status === 'added' ? 'bg-green-100 text-green-700' :
                rx.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionScanner;
