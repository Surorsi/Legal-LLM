import React from 'react';
import { AppView } from '../types';
import { ChatBubbleIcon, HistoryIcon, FeedIcon, SunIcon, MoonIcon, PlusIcon, BalanceIcon, MenuIcon, ChartBarIcon } from './icons';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  startNewChat: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary-500 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, theme, toggleTheme, startNewChat, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
            <BalanceIcon className="h-8 w-8 text-primary-500" />
            <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Legal LLM</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
             <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-grow p-4 space-y-2">
        <button onClick={startNewChat} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-all duration-200">
            <PlusIcon className="w-5 h-5" />
            <span className="ml-2">New Chat</span>
        </button>
        <nav className="mt-4 space-y-1">
            <NavItem icon={<ChatBubbleIcon className="w-5 h-5"/>} label="Chat" isActive={currentView === AppView.CHAT} onClick={() => setView(AppView.CHAT)} />
            <NavItem icon={<HistoryIcon className="w-5 h-5"/>} label="History" isActive={currentView === AppView.HISTORY} onClick={() => setView(AppView.HISTORY)} />
            <NavItem icon={<FeedIcon className="w-5 h-5"/>} label="Legal Feed" isActive={currentView === AppView.FEED} onClick={() => setView(AppView.FEED)} />
            <NavItem icon={<ChartBarIcon className="w-5 h-5"/>} label="Visualizations" isActive={currentView === AppView.VISUALIZATIONS} onClick={() => setView(AppView.VISUALIZATIONS)} />
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
        <div>
            <label htmlFor="language" className="text-xs font-semibold text-gray-500 dark:text-gray-400">LANGUAGE</label>
            <select id="language" className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option>English</option>
                <option>हिन्दी (Hindi)</option>
            </select>
        </div>
        <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">THEME</label>
            <div className="flex items-center justify-between mt-1 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <button onClick={() => theme === 'dark' && toggleTheme()} className={`w-1/2 flex justify-center items-center p-1 rounded-md text-sm ${theme === 'light' ? 'bg-white shadow' : 'text-gray-400'}`}>
                    <SunIcon className="w-5 h-5 mr-1"/> Light
                </button>
                 <button onClick={() => theme === 'light' && toggleTheme()} className={`w-1/2 flex justify-center items-center p-1 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-800 shadow text-white' : 'text-gray-500'}`}>
                    <MoonIcon className="w-5 h-5 mr-1"/> Dark
                </button>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;