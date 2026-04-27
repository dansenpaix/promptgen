import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './DraftingAnimation.css';

export default function DraftingAnimation({ imageUrl, onComplete }) {
  const [stage, setStage] = useState('sketching'); // sketching -> coloring -> labels -> complete

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('coloring'), 2500);
    const timer2 = setTimeout(() => setStage('labels'), 4000);
    const timer3 = setTimeout(() => {
      setStage('complete');
      onComplete();
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="drafting-container">
      <div className="drafting-message">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {stage === 'sketching' && "Drafting fine ink linework..."}
          {stage === 'coloring' && "Bleeding botanical pigments..."}
          {stage === 'labels' && "Adding scientific lithograph annotations..."}
        </motion.p>
      </div>

      <div className="poster-wrapper">
        {/* Sketching Phase - Grayscale and masked */}
        <motion.div 
          className="poster-layer sketching-layer"
          initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ 
            opacity: stage === 'sketching' || stage === 'coloring' || stage === 'labels' ? 1 : 0, 
            clipPath: 'circle(100% at 50% 50%)' 
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <img src={imageUrl} alt="Sketch" className="draft-img sketch" />
        </motion.div>

        {/* Coloring Phase - Original color fading in */}
        <motion.div 
          className="poster-layer coloring-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'coloring' || stage === 'labels' ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <img src={imageUrl} alt="Colored" className="draft-img" />
        </motion.div>

        {/* Labels Phase - Faking the labels popping in over the image */}
        {stage === 'labels' && (
          <motion.div 
            className="labels-layer outline-labels"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
           <div className="fake-label label-1">
              <span className="line"></span> Fig. 1: Cranial Structure
           </div>
           <div className="fake-label label-2">
              <span className="line"></span> Fig. 2: Orbital Cavity
           </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
