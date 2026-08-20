import React from 'react';

export default function AudioVisualizer({ isActive }) {
  const bars = [16, 28, 45, 60, 80, 50, 70, 90, 65, 40, 85, 55, 30, 20];

  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 h-12 py-2">
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-1.5 bg-gradient-to-t from-orange-500 to-amber-300 rounded-full transition-all duration-150 animate-wave"
          style={{
            height: `${height}%`,
            animationDelay: `${(index % 5) * 0.15}s`,
            animationDuration: `${0.6 + (index % 4) * 0.2}s`
          }}
        />
      ))}
    </div>
  );
}
