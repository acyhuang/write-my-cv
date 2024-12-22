import React, { useState } from 'react';
import { ResumeUpload } from './ResumeUpload';
import { JobDescription } from './JobDescription';
import { ChatInterface } from './ChatInterface';
import { Message } from '../../types';

interface ContextContainerProps {
  onCoverLetterGenerated: (coverLetter: string) => void;
  currentCoverLetter?: string;
}

export function ContextContainer({ onCoverLetterGenerated, currentCoverLetter }: ContextContainerProps) {
  const [resume, setResume] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || '';

  return (
    <div className="bg-gray-100 w-1/3 max-w-lg p-6 border-r border-gray-200">
      <ResumeUpload 
        resume={resume}
        setResume={setResume}
        apiBaseUrl={API_BASE_URL}
      />
      <JobDescription
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />
      <ChatInterface
        messages={messages}
        setMessages={setMessages}
        isSending={isSending}
        setIsSending={setIsSending}
        resume={resume}
        jobDescription={jobDescription}
        currentCoverLetter={currentCoverLetter}
        apiBaseUrl={API_BASE_URL}
        onCoverLetterGenerated={onCoverLetterGenerated}
      />
    </div>
  );
}