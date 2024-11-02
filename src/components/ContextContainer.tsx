import React, { useState } from 'react';
import ArrowUpIcon from '../assets/Arrow up-circle.svg';
import axios from 'axios';

interface ContextContainerProps {
  onCoverLetterGenerated: (coverLetter: string) => void;
}

function ContextContainer({ onCoverLetterGenerated }: ContextContainerProps) {
  const [resume, setResume] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [message, setMessage] = useState<string>('');

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      
      try {
        const response = await axios.post('/api/upload-resume', formData);
        console.log('Resume text:', response.data.text); 
        setResume(response.data.text);
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }
  };

  // TODO: Called every time the job description textarea is changed, make this more efficient?
  const handleJobDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(event.target.value);
    console.log('Job description:', event.target.value); 
  };

  const handleSendMessage = async () => {
    console.log('handleSendMessage called');
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setMessages([...messages, userMessage]);
    setMessage('');

    try {
      console.log('Sending request to /api/generate-cv');
      const response = await axios.post('/api/generate-cv', {
        resume,
        jobDescription,
        messages: [...messages, userMessage],
      });

      const explanationMessage = { sender: 'assistant', text: response.data.message };
      setMessages([...messages, userMessage, explanationMessage]);
      
      onCoverLetterGenerated(response.data.coverLetter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      const errorMessage = { sender: 'assistant', text: 'Sorry, there was an error generating the cover letter.' };
      setMessages([...messages, userMessage, errorMessage]);
    }
  };

  return (
    <div className="bg-gray-100 w-1/3 p-6 border-r border-gray-200">
      <div className="resume-container flex justify-between items-center w-full border-b border-gray-200 pb-4">
        <p className="body-2">RESUME</p>
        <label className="upload-resume-btn px-4 py-2 bg-gray-200 text-gray-600 rounded-full cursor-pointer">
          <p className="body-3">{resume ? '✓ UPLOADED' : 'UPLOAD'}</p>
          <input type="file" accept="application/pdf" className="hidden" onChange={handleResumeUpload} />
        </label>
      </div>
      <div className="desc-container pt-4 pb-4 border-b border-gray-200">
        <p className="body-2">JOB DESCRIPTION</p>
        <textarea
          className="desc-field text-xs w-full rounded-xl border border-gray-300 mt-2 p-2 resize-none"
          rows={4}
          placeholder="Paste job description..."
          onChange={handleJobDescriptionChange}
          value={jobDescription}
        ></textarea>
      </div>
      <div className="chat-container flex flex-col flex-grow overflow-hidden pt-4 pb-4 border-b border-blue-200">
        <div className="flex-grow overflow-y-auto">
          <div className="chat-history-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'AI' ? 'ai-message' : 'user-message'}`}>
                <p>{`${msg.sender}: ${msg.text}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center mt-auto border border-green-300">
          <textarea
            className="message-input-field text-xs w-full rounded-xl border border-gray-300 p-2 resize-none"
            rows={2}
            placeholder="Write me a cover letter..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
          ></textarea>
          <button
            className="send-button w-10 h-10 text-white rounded-full flex items-center justify-center ml-2"
            onClick={handleSendMessage}
          >
            <img src={ArrowUpIcon} alt="Send" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContextContainer;