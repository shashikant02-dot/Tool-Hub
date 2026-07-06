'use client';

import React, { useState, useRef } from 'react';
import { useFreeUsage } from '../context/FreeUsageContext';

export default function JpgToPdfConverter() {
 const { checkLimit, increaseUsage, setShowPopup } = useFreeUsage();
const TOOL = "jpgToPdf";
  const [images, setImages] = useState([]);
  const [filename, setFilename] = useState('');
  const [pageSize, setPageSize] = useState('Fit to image');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef(null);
  const secondaryInputRef = useRef(null);

  const totalSize = images.reduce((acc, img) => acc + parseFloat(img.size), 0).toFixed(1);

  // FIXED: Yahan input stream value reset daal di hai taaki multi-trigger perfectly chale
  const handleFileChange = (files, inputRef) => {
  if (!files || files.length === 0) return;

  if (checkLimit(TOOL)) {
    setShowPopup(true);
    return;
  }

  increaseUsage(TOOL);

  const validExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  const newImages = [];

  for (let i = 0; i < files.length; i++) {
    const currentFile = files[i];

    if (validExtensions.includes(currentFile.type)) {
      newImages.push({
        name: currentFile.name,
        size: (currentFile.size / (1024 * 1024)).toFixed(1),
        url: URL.createObjectURL(currentFile),
        raw: currentFile
      });
    }
  }

  setImages((prev) => [...prev, ...newImages]);

  if (inputRef?.current) {
    inputRef.current.value = "";
  }
};

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFileChange(e.dataTransfer.files, null);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearAll = () => {
    setImages([]);
    setFilename('');
    setPageSize('Fit to image');
  };

  const loadImageElement = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  const processToTargetJpg = (imgElement, targetWidth, targetHeight, mode) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (mode === 'Fit to image') {
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgElement, 0, 0);
      } else {
        const scaleFactor = 3; 
        canvas.width = targetWidth * scaleFactor;
        canvas.height = targetHeight * scaleFactor;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
        const canvasRatio = canvas.width / canvas.height;
        
        let drawWidth, drawHeight;
        if (imgRatio > canvasRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
        }

        const xOffset = (canvas.width - drawWidth) / 2;
        const yOffset = (canvas.height - drawHeight) / 2;

        ctx.drawImage(imgElement, xOffset, yOffset, drawWidth, drawHeight);
      }

      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.92);
    });
  };

const convertImagesToPdf = async () => {
  if (images.length === 0) return;

  if (checkLimit(TOOL)) {
    setShowPopup(true);
    return;
  }

  increaseUsage(TOOL);

  setIsProcessing(true);

  try {
    const { PDFDocument } = await import('pdf-lib');
    const pdfDoc = await PDFDocument.create();

    const standardSizes = {
      A4: [595.28, 841.89],
      Letter: [612.00, 792.00],
      A3: [841.89, 1190.55],
      A5: [419.53, 595.28],
      Legal: [612.00, 1008.00],
      Tabloid: [792.00, 1224.00]
    };

    for (const imgData of images) {
      const imgElement = await loadImageElement(imgData.url);

      let targetWidth, targetHeight;

      if (pageSize === 'Fit to image') {
        targetWidth = imgElement.naturalWidth;
        targetHeight = imgElement.naturalHeight;
      } else {
        [targetWidth, targetHeight] = standardSizes[pageSize];
      }

      const processedJpgBlob = await processToTargetJpg(
        imgElement,
        targetWidth,
        targetHeight,
        pageSize
      );

      const jpgArrayBuffer = await processedJpgBlob.arrayBuffer();
      const embeddedImage = await pdfDoc.embedJpg(jpgArrayBuffer);

      const page = pdfDoc.addPage([targetWidth, targetHeight]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: targetWidth,
        height: targetHeight,
      });
    }

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename.trim() || 'converted_document'}.pdf`;
    link.click();

  } catch (err) {
    console.error(err);
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="  py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-900">
      <div className="mx-auto max-w-[64vw] space-y-6 mt-12">
        
        {/* STATE A: Initial Empty Screen Dropzones */}
        {images.length === 0 && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <h2 className="text-[24px] font-semibold text-gray-800 pl-0.5">Add your images</h2>
              <div 
                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                onClick={() => fileInputRef.current.click()}
                className={`flex flex-col items-center justify-center rounded-xl border border-dashed p-12 transition-all cursor-pointer bg-white shadow-sm
                  ${isDragging ? 'border-blue-500 bg-blue-50/10' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files, fileInputRef)} className="hidden" accept=".jpg,.jpeg,.png,.webp" multiple />
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                </div>
                <p className="text-[18px] font-semibold text-gray-800">Drag and drop files or click to browse</p>
                <p className="mt-1 text-[13px] text-gray-400 font-medium">JPG, JPEG, PNG, WEBP · Up to 50 MB per file</p>
              </div>
            </div>

            <div 
              onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
              onClick={() => secondaryInputRef.current.click()}
              className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 p-12 transition-all cursor-pointer bg-white shadow-sm hover:border-gray-300"
            >
              <input type="file" ref={secondaryInputRef} onChange={(e) => handleFileChange(e.target.files, secondaryInputRef)} className="hidden" accept=".jpg,.jpeg,.png,.webp" multiple />
              <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              </div>
              <p className="text-[18px] font-semibold text-gray-800">Add images to build your PDF</p>
              <p className="mt-1 text-[13px] text-gray-400 font-medium text-center max-w-md px-4">
                Drag and drop JPG, PNG, or WEBP images here or click to browse.
              </p>
            </div>
          </div>
        )}

        {/* STATE B: Active Workspace */}
        {images.length > 0 && (
          <>
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[16px] font-semibold text-gray-600 tracking-tight">{images.length} {images.length === 1 ? 'file' : 'files'}</span>
              <button onClick={clearAll} className="flex items-center gap-1 text-[15px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Clear all
              </button>
            </div>

            {/* Document Profile Strip Row */}
            <div className="flex items-center justify-between rounded-xl border border-gray-200/60 bg-white p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-gray-800 tracking-tight">
                    {filename.trim() ? `${filename.trim()}.pdf` : 'converted_document.pdf'}
                  </h4>
                  <p className="text-[14px] text-gray-400 font-medium mt-0.5">{totalSize} MB · {images.length} {images.length === 1 ? 'page' : 'pages'}</p>
                </div>
              </div>
              <button onClick={clearAll} className="text-gray-400 hover:text-gray-500 transition-colors p-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Workspace Settings Controls Panel */}
            <div className="rounded-xl border border-gray-200/60 bg-white p-5 space-y-5 shadow-sm">
              <div className="space-y-2">
                <label className="text-[16px]  font-bold text-gray-800 tracking-tight ">Page size</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Fit to image', 'A4', 'Letter', 'A3', 'A5', 'Legal', 'Tabloid'].map((size) => (
                    <button
                      key={size} type="button" onClick={() => setPageSize(size)}
                      className={`rounded-md px-3.5 py-1.5 text-[16px] mt-4 font-medium tracking-tight transition-all
                        ${pageSize === size ? 'bg-blue-600 text-white shadow-sm' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[14px] text-gray-400 font-medium pt-0.5">
                  {pageSize === 'Fit to image' 
                    ? 'Each page is sized to its image, so no margins or fit mode are needed.' 
                    : `Images will be re-drawn internally onto localized high-DPI ${pageSize} canvases.`}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[16px] font-bold text-gray-800 tracking-tight">Output filename</label>
                <input
                  type="text" placeholder="Enter a custom filename" value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[15px] text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 placeholder:text-gray-400"
                />
              </div>

              <div className="flex gap-3 pt-1">
                {/* FIXED TRIGGER: Passing the fileInputRef here safely cleans current cache states */}
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-[16px] font-semibold text-gray-700 bg-white transition-colors"
                >
                  Add More Images
                </button>
                <button 
                  onClick={convertImagesToPdf} disabled={isProcessing}
                  className=" bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-8 rounded-lg shadow-sm text-[13px] tracking-tight transition-colors text-center "
                >
                  {isProcessing ? 'Processing Dimensions & Compiling...' : 'Convert to PDF'}
                </button>
              </div>
              <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files, fileInputRef)} className="hidden" accept=".jpg,.jpeg,.png,.webp" multiple />
            </div>

            {/* Previews Grid Rendering */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-2">
              {images.map((img, index) => (
                <div key={index} className="flex flex-col items-center rounded-xl border border-gray-200/60 bg-white p-3 shadow-sm relative group hover:border-gray-300 transition-all">
                  <button 
                    onClick={() => removeImage(index)}
                    className="absolute top-5 right-5 h-5 w-5 flex items-center justify-center bg-gray-900/80 hover:bg-gray-900 text-white rounded-full transition-colors z-10 shadow-sm"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                  <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50/50 border border-gray-100">
                    <img src={img.url} alt={`Page ${index + 1}`} className="h-full w-full object-contain object-center bg-white" />
                  </div>
                  <span className="mt-3 text-[12px] font-bold text-gray-500">{index + 1}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}