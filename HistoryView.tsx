import React from 'react';
import { ChatSession } from '../types';
import { ChatBubbleIcon, TrashIcon, PlusIcon } from './icons';

interface HistoryViewProps {
  chatSessions: ChatSession[];
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onNewChat: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ chatSessions, onSelectChat, onDeleteChat, onNewChat }) => {

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Chat History
            </h2>
            <button onClick={onNewChat} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-all duration-200">
                <PlusIcon className="w-5 h-5" />
                <span className="ml-2">New Chat</span>
            </button>
        </div>

        {chatSessions.length === 0 ? (
            <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400">No chat history found.</p>
                <p className="text-gray-500 dark:text-gray-400">Start a new conversation to see it here.</p>
            </div>
        ) : (
            <div className="space-y-4">
            {chatSessions.map(session => (
                <div key={session.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center justify-between">
                    <button onClick={() => onSelectChat(session.id)} className="flex-grow text-left flex items-center group">
                        <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/50 mr-4">
                            <ChatBubbleIcon className="w-5 h-5 text-primary-600 dark:text-primary-300" />
                        </div>
                        <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {session.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {session.messages.length} messages - Last updated: {formatDate(session.lastUpdated)}
                        </p>
                        </div>
                    </button>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(session.id);
                        }} 
                        className="p-2 rounded-full text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label="Delete chat"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
