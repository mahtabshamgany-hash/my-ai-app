
import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all min-h-[300px]
          ${isDragging ? 'border-nature-500 bg-nature-50' : 'border-slate-300 hover:border-nature-400 hover:bg-slate-50'}
        `}
      >
        <div className="w-20 h-20 bg-nature-100 text-nature-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Upload className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-lalezar text-slate-800 mb-2">انتخاب از گالری</h3>
        <p className="text-slate-500 text-center">فایل تصویر را به اینجا بکشید یا کلیک کنید</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()} // Simulating camera via standard input capture on mobile
        className="relative group cursor-pointer border-2 border-dashed border-slate-300 hover:border-nature-400 hover:bg-slate-50 rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all min-h-[300px]"
      >
        <div className="w-20 h-20 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Camera className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-lalezar text-slate-800 mb-2">عکس گرفتن مستقیم</h3>
        <p className="text-slate-500 text-center">با دوربین دستگاه خود از گیاه عکس بگیرید</p>
        {/* On most mobile browsers, adding capture="environment" to a file input triggers the camera */}
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
