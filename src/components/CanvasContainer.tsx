import React from 'react';

interface CanvasContainerProps {
  coverLetter: string;
  onCoverLetterChange: (newValue: string) => void;
}

function CanvasContainer({ coverLetter, onCoverLetterChange }: CanvasContainerProps) {
  return (
    <div className="bg-gray-50 w-2/3 h-full flex flex-col">
      <div className="canvas-content flex-1">
        <textarea
          className="bg-gray-50 w-full h-full p-12 font-sans resize-none"
          value={coverLetter}
          onChange={(e) => onCoverLetterChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CanvasContainer;