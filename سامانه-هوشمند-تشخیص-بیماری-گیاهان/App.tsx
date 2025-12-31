
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Upload, AlertCircle, CheckCircle, Download, FileJson, ArrowRight, Camera, Loader2 } from 'lucide-react';
import { AppState, DiagnosisResult } from './types';
import { analyzePlantImage } from './services/geminiService';
import LandingPage from './components/LandingPage';
import ImageUploader from './components/ImageUploader';
import DiagnosisResultView from './components/DiagnosisResultView';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('landing');
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => setState('uploading');

  const handleImageSelect = (base64: string) => {
    setSelectedImage(base64);
    handleAnalyze(base64);
  };

  const handleAnalyze = async (base64: string) => {
    setState('analyzing');
    setError(null);
    try {
      const diagnosis = await analyzePlantImage(base64);
      setResult(diagnosis);
      setState('result');
    } catch (err) {
      console.error(err);
      setError('متاسفانه خطایی در تحلیل تصویر رخ داد. لطفا دوباره تلاش کنید.');
      setState('uploading');
    }
  };

  const resetApp = () => {
    setState('landing');
    setResult(null);
    setSelectedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {state === 'landing' && (
          <LandingPage key="landing" onStart={handleStart} />
        )}

        {state === 'uploading' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 py-12 max-w-4xl"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl font-lalezar text-nature-700 mb-4">تصویر گیاه خود را بارگذاری کنید</h1>
              <p className="text-slate-600">هوش مصنوعی ما در چند ثانیه وضعیت سلامت گیاه شما را بررسی می‌کند.</p>
            </div>
            
            <ImageUploader onImageSelect={handleImageSelect} />
            
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-12 text-center text-sm text-slate-400">
              <p>طراح: مهتاب شمگانی | استاد راهنما: دکتر رحیم کریمی</p>
            </div>
          </motion.div>
        )}

        {state === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-50"
          >
            <div className="relative">
              <div className="w-32 h-32 border-4 border-nature-100 border-t-nature-600 rounded-full animate-spin"></div>
              <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-nature-600 animate-pulse" />
            </div>
            <h2 className="mt-8 text-2xl font-lalezar text-nature-800">در حال تحلیل هوشمند گیاه...</h2>
            <p className="mt-2 text-slate-500">لطفا شکیبا باشید، فرآیند تحلیل ممکن است چند لحظه طول بکشد.</p>
          </motion.div>
        )}

        {state === 'result' && result && selectedImage && (
          <DiagnosisResultView 
            key="result"
            result={result} 
            image={selectedImage} 
            onReset={resetApp} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
