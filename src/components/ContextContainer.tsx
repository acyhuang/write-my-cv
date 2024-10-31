import React, { useState } from 'react';
import ArrowUpIcon from '../assets/Arrow up-circle.svg';
import axios from 'axios';

function ContextContainer() {
  const [resume, setResume] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);

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

  return (
    <div className="bg-gray-100 w-1/3 p-6">
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
        ></textarea>
      </div>
      <div className="chat-container flex flex-col flex-grow overflow-hidden pt-4 pb-4 border-b border-blue-200">
        <div className="flex-grow overflow-y-auto">
          {/* Chat history will be displayed here */}
          <div className="chat-history-container">
            {/* Example message */}
            {/* <div className="message user-message">
              <p>User: Hello!</p>
            </div>
            <div className="message ai-message">
              <p>AI: Hi there! How can I assist you today?</p>
            </div> */}
            {/* Add more messages dynamically */}
          </div>
        </div>
        <div className="flex flex-row items-center mt-auto border border-green-300 ">
          <textarea
            className="message-input-field text-xs w-full rounded-xl border border-gray-300 p-2 resize-none"
            rows={2}
            placeholder="Write me a cover letter..."
            // Add state and event handlers as needed
            // onChange={handleInputChange}
            // value={message}
          ></textarea>
          <button
            className="send-button w-10 h-10 text-white rounded-full flex items-center justify-center ml-2"
            // onClick={handleSendMessage}
          >
            <img src={ArrowUpIcon} alt="Send" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContextContainer;