import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import CanvasTextureFilter from './CanvasTextureFilter';
import './ParallaxPoster.css';

export default function ParallaxPoster({ imageUrl }) {
  const containerRef = useRef(null);

  // Motion values for mouse coordinates (-1 to 1 based on center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Map spring values to translation px for the background image
  const bgX = useTransform(springX, [-1, 1], [-10, 10]);
  const bgY = useTransform(springY, [-1, 1], [-10, 10]);

  // Labels move more (creating parallax effect)
  const labelX = useTransform(springX, [-1, 1], [25, -25]);
  const labelY = useTransform(springY, [-1, 1], [25, -25]);

  // Diagram lines move even more
  const linesX = useTransform(springX, [-1, 1], [40, -40]);
  const linesY = useTransform(springY, [-1, 1], [40, -40]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to container center (-1 to 1)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const maxDistanceX = rect.width / 2;
    const maxDistanceY = rect.height / 2;

    const normalizedX = (e.clientX - centerX) / maxDistanceX;
    const normalizedY = (e.clientY - centerY) / maxDistanceY;

    // Constrain to -1 to 1
    mouseX.set(Math.max(-1, Math.min(1, normalizedX)));
    mouseY.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  const handleMouseLeave = () => {
    // Reset to center
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="parallax-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layer 1: Background Image with Canvas Texture */}
      <motion.div 
        className="parallax-layer base-image"
        style={{ x: bgX, y: bgY }}
      >
        <CanvasTextureFilter imageUrl={imageUrl} className="canvas-texture" />
      </motion.div>

      {/* Layer 2: Diagram Lines */}
      <motion.div 
        className="parallax-layer diagram-lines-layer"
        style={{ x: linesX, y: linesY }}
      >
        <svg viewBox="0 0 500 500" width="100%" height="100%" className="diagram-svg">
          <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(26,26,26,0.3)" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="250" y1="50" x2="250" y2="450" stroke="rgba(26,26,26,0.2)" strokeWidth="1" />
          <line x1="50" y1="250" x2="450" y2="250" stroke="rgba(26,26,26,0.2)" strokeWidth="1" />
          <rect x="150" y="150" width="200" height="200" fill="none" stroke="rgba(26,26,26,0.2)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Layer 3: Labels */}
      <motion.div 
        className="parallax-layer final-labels-layer"
        style={{ x: labelX, y: labelY }}
      >
        <div className="p-label" style={{ top: '15%', left: '15%' }}>
          <div className="p-dot"></div>
          <span>Fig. 1 <br/> Cranial View</span>
        </div>
        <div className="p-label" style={{ bottom: '20%', right: '15%' }}>
          <div className="p-dot"></div>
          <span>Fig. 2 <br/> Orbital Structure</span>
        </div>
      </motion.div>
    </div>
  );
}
