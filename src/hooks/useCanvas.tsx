import { useEffect, useRef, useState } from 'react';

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();

  useEffect(() => {
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = 'green';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'black';
      context.font = 'bold 48px courier';
      context.textAlign = 'center';
      context.fillText('gpu is OK', canvas.width / 2, canvas.height / 2);
    }
  }, [canvas]);

  if (canvasRef.current && !canvas) {
    setCanvas(canvasRef.current);
  }

  return {
    canvasRef,
    canvas,
  };
}
