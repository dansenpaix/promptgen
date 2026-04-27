import React, { useState } from 'react';
import UploadSection from './components/UploadSection';
import DraftingAnimation from './components/DraftingAnimation';
import ParallaxPoster from './components/ParallaxPoster';

function App() {
  const [appState, setAppState] = useState('upload'); // upload -> drafting -> result
  const [finalImage, setFinalImage] = useState(null);

  const handleUpload = async (file, previewUrl) => {
    // In a real app, we would send 'file' to our backend:
    // const formData = new FormData();
    // formData.append('image', file);
    // await fetch('http://localhost:5000/api/generate', { method: 'POST', body: formData });
    
    // For the UI demo, we use the uploaded image directly (previewUrl)
    // and apply our custom CSS and Canvas filters to give it the botanical aesthetic natively!
    setAppState('drafting');
    setFinalImage(previewUrl); 
  };

  const handleDraftingComplete = () => {
    setAppState('result');
  };

  const resetApp = () => {
    setAppState('upload');
    setFinalImage(null);
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        
        <header className="title-header">
          <h1>Botanica Obscura</h1>
          <p>19th-Century Anatomical & Botanical Syntheses</p>
        </header>

        {appState === 'upload' && (
          <UploadSection onUpload={handleUpload} />
        )}

        {appState === 'drafting' && finalImage && (
          <div className="drafting-container-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="prompt-display" style={{ background: 'rgba(26,26,26,0.6)', padding: '1rem', border: '1px solid var(--color-ink-light)', borderRadius: '8px', marginBottom: '2rem', maxWidth: '800px', fontSize: '0.9rem', color: '#ccc', fontStyle: 'italic' }}>
              {/* <strong>Execution Prompt:</strong> "A 19th-century scientific botanical atlas plate. The subject is a high-fidelity anatomical study of the specific individual in the uploaded image, maintaining their exact facial structure, hair texture, and unique physical features. Execution: Reinterpret the face and bust using fine ink linework and delicate cross-hatching. The primary illustration must be a central, realistic portrait of the person. Scientific Elements: Surround the portrait with smaller inset diagrams analyzing specific features (like an eye or profile) of this exact subject. Use vibrant colors sampled from the original photo. Set on a clean, off-white vintage parchment background with annotated text and guide lines." */}
            </div>
            <DraftingAnimation 
              imageUrl={finalImage} 
              onComplete={handleDraftingComplete} 
            />
          </div>
        )}

        {appState === 'result' && finalImage && (
          <div className="result-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <ParallaxPoster imageUrl={finalImage} />
            <button className="btn-primary" onClick={resetApp}>Chronicle Another Study</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
