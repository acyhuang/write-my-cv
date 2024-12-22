import React from 'react';

interface JobDescriptionProps {
  jobDescription: string;
  setJobDescription: (description: string) => void;
}

export function JobDescription({ jobDescription, setJobDescription }: JobDescriptionProps) {
  return (
    <div className="desc-container pt-4 pb-4 border-b border-gray-200">
      <p className="body-2">JOB DESCRIPTION</p>
      <textarea
        className="desc-field text-xs w-full rounded-xl border border-gray-300 mt-2 p-2 resize-none"
        rows={4}
        placeholder="Paste job description..."
        onChange={(e) => setJobDescription(e.target.value)}
        value={jobDescription}
      ></textarea>
    </div>
  );
}