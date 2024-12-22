import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Message } from '../../types';
import { ReactComponent as ArrowUpIconComponent } from '../../icons/Arrow up-circle.svg';
import { useTextareaAutosize } from '../../hooks/useTextareaAutosize';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isSending: boolean;
  setIsSending: (isSending: boolean) => void;
  resume: string;
  jobDescription: string;
  currentCoverLetter?: string;
  apiBaseUrl: string;
  onCoverLetterGenerated: (coverLetter: string) => void;
}

export function ChatInterface({
  messages,
  setMessages,
  isSending,
  setIsSending,
  resume,
  jobDescription,
  currentCoverLetter,
  apiBaseUrl,
  onCoverLetterGenerated
}: ChatInterfaceProps) {
  const [message, setMessage] = useState<string>(
    'Paragraph 1 expresses interest in the company. Paragraph 2 explains fit with the role and overview of qualifications. Paragraph 3 contains a bulleted list of relevant outcomes from my resume. Paragraph 4 thanks the reader for their time and consideration.'
  );

  const { adjustTextareaHeight } = useTextareaAutosize();

  const sendGenerateCvRequest = async (updatedMessages: Message[]) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/generate-cv`, {
        resume,
        jobDescription,
        messages: updatedMessages,
        currentCoverLetter: currentCoverLetter || '',
      });

      const explanationMessage: Message = { 
        sender: 'assistant', 
        text: response.data.message 
      };
      
      setMessages((prevMessages: Message[]) => [...prevMessages, explanationMessage]);
      onCoverLetterGenerated(response.data.coverLetter);
    } catch (error: any) {
      console.error('Error generating cover letter:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      const errorMessage: Message = { 
        sender: 'assistant', 
        text: `Error: ${error.response?.data?.error || error.message || 'Unknown error occurred'}` 
      };
      setMessages((prevMessages: Message[]) => [...prevMessages, errorMessage]);
    }
  };

  const handleSendMessage = useCallback(async () => {
    if (isSending || !message.trim()) return;
    setIsSending(true);

    const userMessage: Message = { sender: 'user', text: message };
    setMessages((prevMessages: Message[]) => [...prevMessages, userMessage]);

    try {
      await sendGenerateCvRequest([...messages, userMessage]);
    } finally {
      setIsSending(false);
    }

    setMessage('');
  }, [message, messages, isSending, sendGenerateCvRequest, setMessage, setIsSending]);

  return (
    <div className="chat-container flex flex-col flex-grow overflow-hidden pt-4 pb-4 border-b border-blue-200">
      <div className="flex-grow overflow-y-auto">
        <div className="chat-history-container text-sm">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === 'AI' ? 'ai-message' : 'user-message'} mb-4`}
            >
              <p>
                <span className="font-bold">{msg.sender}</span>: {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center mt-auto">
        <textarea
          className="message-input-field text-xs w-full rounded-xl border border-gray-300 p-2 resize-none overflow-hidden"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            adjustTextareaHeight(e.target);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          className="send-button w-10 h-10 text-white rounded-full flex items-center justify-center ml-2 hover:bg-gray-100"
          onClick={handleSendMessage}
          disabled={isSending}
        >
          <ArrowUpIconComponent className="w-8 h-8 text-gray-500 hover:text-gray-700" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}