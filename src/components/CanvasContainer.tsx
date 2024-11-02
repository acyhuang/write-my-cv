import React from 'react';

interface CanvasContainerProps {
  coverLetter: string;
}

function CanvasContainer({ coverLetter }: CanvasContainerProps) {
  return (
    <div className="bg-gray-50 w-2/3 p-6">
      <div className="canvas-content">
        {coverLetter ? (
          <pre className="whitespace-pre-wrap font-sans">{coverLetter}</pre>
        ) : (
          <p className="text-gray-400">Your cover letter will appear here...</p>
        )}
      </div>
    </div>
  );
}

export default CanvasContainer;