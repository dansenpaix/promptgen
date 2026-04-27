import React, { useRef, useEffect } from 'react';

export default function CanvasTextureFilter({ imageUrl, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Generate Paper Texture/Noise
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply subtle noise to simulate paper texture variations
      for (let i = 0; i < data.length; i += 4) {
        // Random noise between -10 and 10
        const noise = (Math.random() - 0.5) * 20;

        // Apply a warm/sepia tint to mimic parchment and add noise
        data[i] = Math.min(255, data[i] + noise + 10);     // Red
        data[i + 1] = Math.min(255, data[i + 1] + noise + 5); // Green
        data[i + 2] = Math.max(0, data[i + 2] + noise - 10);  // Blue
        // Alpha is untouched
      }

      ctx.putImageData(imageData, 0, 0);

      // Draw some larger "stains" using radial gradients
      for(let j = 0; j < 3; j++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 150 + 50;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(139, 69, 19, 0.05)'); // subtle brown stain
        gradient.addColorStop(1, 'rgba(139, 69, 19, 0)');
        
        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
}
