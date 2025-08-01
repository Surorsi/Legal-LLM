import React, { useState, useRef, useEffect, useCallback } from 'react';
import { generateResponse } from '../services/geminiService';
import { ChatMessage, MessageAuthor, ChatSession } from '../types';
import { SendIcon, PaperClipIcon, MicrophoneIcon, BalanceIcon } from './icons';
import ReactMarkdown from 'react-markdown';

interface ChatViewProps {
  chatSession: ChatSession;
  setChatSession: (messages: ChatMessage[]) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ chatSession, setChatSession }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [chatSession.messages]);

  const handleSendMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput && !fileName) return;

    setIsLoading(true);
    const userMessageContent = fileName ? `Please analyze the following document: ${fileName}.\n\n${trimmedInput}` : trimmedInput;
    
    const newUserMessage: ChatMessage = {
      author: MessageAuthor.USER,
      content: userMessageContent,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    const updatedHistory = [...chatSession.messages, newUserMessage];
    setChatSession(updatedHistory);
    
    setInput('');
    setFileName(null);
    if(fileInputRef.current) fileInputRef.current.value = "";

    try {
      const response = await generateResponse(updatedHistory, userMessageContent);
      const modelMessage: ChatMessage = {
        author: MessageAuthor.MODEL,
        content: response,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatSession([...updatedHistory, modelMessage]);
    } catch (error) {
       const errorMessage: ChatMessage = {
        author: MessageAuthor.SYSTEM,
        content: "An unexpected error occurred. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatSession([...updatedHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, fileName, chatSession.messages, setChatSession]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);
      // In a real app, you would read the file content here.
    }
  };
  
  const toggleListening = () => {
      // This is a placeholder for actual speech recognition logic.
      if (isListening) {
          setIsListening(false);
          setInput(prev => prev + " (voice input placeholder) ");
      } else {
          setIsListening(true);
      }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {chatSession.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <BalanceIcon className="w-24 h-24 mb-4 text-primary-500/50"/>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Welcome to Legal LLM</h2>
            <p className="max-w-md mt-2">Your AI legal assistant for Indian law. Ask a question, or upload a document to get started.</p>
          </div>
        ) : (
          chatSession.messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-3 ${msg.author === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.author === 'model' && <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold flex-shrink-0">L</div>}
              <div className={`max-w-xl p-3 rounded-2xl ${
                msg.author === 'user'
                  ? 'bg-primary-500 text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <p className="text-xs mt-2 opacity-60 text-right">{msg.timestamp}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
           <div className="flex items-end gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold flex-shrink-0">L</div>
              <div className="max-w-xl p-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="relative max-w-4xl mx-auto">
          {fileName && (
              <div className="absolute bottom-full left-0 mb-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center">
                  <span>{fileName}</span>
                  <button onClick={() => {setFileName(null); if(fileInputRef.current) fileInputRef.current.value = "";}} className="ml-2 text-lg font-bold">&times;</button>
              </div>
          )}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.pdf,.doc,.docx"
            />
            <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              <PaperClipIcon className="w-6 h-6" />
            </button>
            <button onClick={toggleListening} className={`p-2 text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 ${isListening ? 'text-red-500' : ''}`}>
              <MicrophoneIcon className="w-6 h-6" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask a legal question or describe the document..."
              className="flex-1 bg-transparent focus:outline-none resize-none px-2 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading || (!input.trim() && !fileName)} className="p-2 rounded-lg bg-primary-500 text-white disabled:bg-primary-300 dark:disabled:bg-primary-800 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors">
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;