
import React from 'react';
import { motion } from 'framer-motion';
import { DiagnosisResult } from '../types';
import { Download, FileJson, ArrowLeft, CheckCircle2, AlertCircle, Info, Sprout } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ResultProps {
  result: DiagnosisResult;
  image: string;
  onReset: () => void;
}

const DiagnosisResultView: React.FC<ResultProps> = ({ result, image, onReset }) => {
  
  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `diagnosis_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`plant_report_${Date.now()}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.button
        whileHover={{ x: 5 }}
        onClick={onReset}
        className="flex items-center gap-2 text-slate-500 hover:text-nature-600 font-lalezar text-xl mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 rotate-180" />
        بازگشت و تحلیل جدید
      </motion.button>

      <div id="report-content" className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="p-8 lg:p-12 bg-slate-50 flex items-center justify-center">
            <div className="relative group">
              <img 
                src={image} 
                alt="Plant" 
                className="w-full h-auto max-h-[500px] object-cover rounded-3xl shadow-lg border-4 border-white"
              />
              <div className="absolute top-4 right-4 bg-nature-600 text-white px-4 py-2 rounded-full font-lalezar shadow-lg">
                دقت تحلیل: {result.confidence}
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-nature-100 text-nature-600 rounded-xl">
                <Sprout className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-lalezar text-slate-900">{result.diseaseName}</h2>
            </div>

            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-2 text-slate-800 font-bold mb-3">
                  <Info className="w-5 h-5 text-nature-500" />
                  شرح وضعیت
                </div>
                <p className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-4 rounded-2xl">
                  {result.description}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 text-slate-800 font-bold mb-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  راهکارهای بهبود و درمان
                </div>
                <ul className="grid grid-cols-1 gap-3">
                  {result.treatments.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 border border-slate-100 rounded-xl hover:bg-blue-50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-2 text-slate-800 font-bold mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  اقدامات پیشگیرانه
                </div>
                <ul className="grid grid-cols-1 gap-3">
                  {result.preventions.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 border border-slate-100 rounded-xl hover:bg-orange-50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
        
        {/* Footer Credit for PDF Export */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-sm text-slate-400">
          <span>گزارش تولید شده در: {result.timestamp}</span>
          <span>طراح: مهتاب شمگانی | راهنما: دکتر رحیم کریمی</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-nature-600 text-white font-lalezar text-xl px-8 py-4 rounded-2xl shadow-lg hover:bg-nature-700 transition-colors"
        >
          <Download className="w-6 h-6" />
          دانلود گزارش PDF
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadJSON}
          className="flex items-center gap-2 bg-slate-800 text-white font-lalezar text-xl px-8 py-4 rounded-2xl shadow-lg hover:bg-slate-900 transition-colors"
        >
          <FileJson className="w-6 h-6" />
          ذخیره فایل JSON
        </motion.button>
      </div>
    </div>
  );
};

export default DiagnosisResultView;
