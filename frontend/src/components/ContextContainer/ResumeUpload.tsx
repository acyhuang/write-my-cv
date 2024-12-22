import React from 'react';
import axios from 'axios';

interface ResumeUploadProps {
  resume: string;
  setResume: (resume: string) => void;
  apiBaseUrl: string;
}

export function ResumeUpload({ resume, setResume, apiBaseUrl }: ResumeUploadProps) {
  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);
    
    try {
      const response = await axios.post(`${apiBaseUrl}/api/upload-resume`, formData);
      setResume(response.data.text);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  return (
    <div className="resume-container flex justify-between items-center w-full border-b border-gray-200 pb-4">
      <p className="body-2">RESUME</p>
      <label className="upload-resume-btn px-4 py-2 bg-gray-200 text-gray-600 rounded-full cursor-pointer">
        <p className="body-3">{resume ? '✓ UPLOADED' : 'UPLOAD'}</p>
        <input 
          type="file" 
          accept="application/pdf" 
          className="hidden" 
          onChange={handleResumeUpload}
        />
      </label>
    </div>
  );
}