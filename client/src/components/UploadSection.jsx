import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import './UploadSection.css';

export default function UploadSection({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file, preview);
    }
  };

  return (
    <div className="upload-container">
      <div 
        className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          className="file-input" 
          accept="image/*" 
          onChange={handleChange} 
        />
        
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <div className="preview-overlay">
              <button className="change-btn" onClick={onButtonClick}>Change Image</button>
            </div>
          </div>
        ) : (
          <div className="upload-prompt" onClick={onButtonClick}>
            <UploadCloud size={48} className="upload-icon" />
            <h3>Select a Portrait</h3>
            <p>Drag and drop or click to upload</p>
          </div>
        )}
      </div>

      <button 
        className="btn-primary start-btn" 
        onClick={handleSubmit}
        disabled={!file}
      >
        Transform to Botanical Study
      </button>
    </div>
  );
}
