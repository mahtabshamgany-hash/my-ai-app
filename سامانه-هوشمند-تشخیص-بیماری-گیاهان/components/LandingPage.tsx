
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Zap, Download } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-nature-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-nature-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 text-center max-w-5xl"
      >
        <div className="inline-flex items-center justify-center p-3 bg-nature-100 text-nature-700 rounded-full mb-8">
          <Leaf className="w-8 h-8 mr-2" />
          <span className="font-bold tracking-wider px-2">PLANT AI DOCTOR</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-lalezar text-slate-900 leading-tight mb-6">
          گیاهان شما، <span className="text-nature-600">سرمایه سبز</span> شما هستند
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          با استفاده از پیشرفته‌ترین الگوریتم‌های هوش مصنوعی، بیماری گیاهان خود را در کمتر از چند ثانیه تشخیص دهید و درمان مناسب را دریافت کنید.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-nature-600 hover:bg-nature-700 text-white text-2xl font-lalezar px-12 py-5 rounded-2xl shadow-xl shadow-nature-200 transition-all flex items-center mx-auto"
        >
          شروع عیب‌یابی گیاه
          <Zap className="mr-3 w-6 h-6 fill-current" />
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-right">
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-nature-600" />}
            title="دقت فوق‌العاده"
            desc="تشخیص بیماری‌ها با دقت بسیار بالا توسط هوش مصنوعی جمینای."
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-nature-600" />}
            title="پاسخ آنی"
            desc="تحلیل تصاویر و ارائه نتایج در کمترین زمان ممکن."
          />
          <FeatureCard 
            icon={<Download className="w-8 h-8 text-nature-600" />}
            title="خروجی PDF و JSON"
            desc="امکان ذخیره و دریافت گزارش کامل بیماری و درمان به صورت فایل."
          />
        </div>

        {/* Credits Section */}
        <div className="mt-24 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-right">
            <p className="text-slate-500 text-lg">طراح و توسعه‌دهنده:</p>
            <p className="text-xl font-lalezar text-slate-800">مهتاب شمگانی</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-lg">استاد راهنما:</p>
            <p className="text-xl font-lalezar text-slate-800">دکتر رحیم کریمی</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="mb-4 inline-block">{icon}</div>
    <h3 className="text-xl font-lalezar text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
