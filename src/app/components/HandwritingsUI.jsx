import { useState } from 'react';

export default function ImageConverter() {
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const processFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setExtractedText("Please upload a valid image file.");
      return;
    }

    setLoading(true);
    setExtractedText('Extracting text...');

    const formData = new FormData();
    formData.append("file", file);

    try {
     const response = await fetch("/api/handwriting", {
  method: "POST",
  body: formData,
});

const data = await response.json();

if (!response.ok) {
  setExtractedText(data.error || "Something went wrong");
  return;
}

setExtractedText(data.text || "No text found.");
    } catch (error) {
      console.error("Frontend Error:", error);
      setExtractedText("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 font-sans select-none">
      {/* Top Free Uses Badge */}
      <div className="flex justify-center mb-5">
        <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium">
          🎁 0/2 free uses
        </span>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Upload Panel */}
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 rounded-2xl p-10 min-h-[400px] flex flex-col justify-center items-center transition-all ${
            dragActive ? "border-blue-500 bg-blue-50/50" : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex flex-col items-center text-center w-full">
            <div className="w-14 h-14 border border-dashed border-blue-200 rounded-full flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Drag & drop, paste or</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-[320px] leading-relaxed">
              PNG, JPEG, JPG, WEBP, BMP, GIF, HEIC, HEIF, PDF up to 10 MB
            </p>
            
            <label className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-medium cursor-pointer inline-flex items-center gap-2 transition-colors">
              {loading ? 'Processing...' : 'Upload File'}
             <input
  type="file"
  accept="image/png,image/jpeg,image/jpg,image/webp"
  onChange={handleFileChange}
  className="hidden"
/>
            </label>
            
            <p className="text-xs text-gray-400 mt-4 mb-0">
              or drag & drop your file here
            </p>
          </div>
        </div>

        {/* Right Side: Result Panel */}
        <div className="border border-gray-200 rounded-2xl p-10 bg-white min-h-[400px] flex flex-col justify-center items-center">
          <div className="w-full h-full flex flex-col justify-center items-center">
            {extractedText ? (
              <div className="w-full text-left flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Extracted Text:</h4>
                  <div className="bg-gray-50 border rounded-xl p-5 whitespace-pre-wrap overflow-y-auto min-h-[300px] max-h-[420px] font-mono text-[15px] leading-7">
    {extractedText}
</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-4 bg-gray-50 p-3 rounded-xl">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <h3 className="text-xl text-gray-400 font-semibold mb-2">Ready to convert</h3>
                <p className="text-sm text-gray-400 max-w-[320px] leading-relaxed">
                  Upload your handwriting to see the extracted text
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}