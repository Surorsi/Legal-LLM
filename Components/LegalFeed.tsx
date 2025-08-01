
import React from 'react';
import { LEGAL_FEED_DATA } from '../constants';
import { LegalUpdate } from '../types';

const FeedCard: React.FC<{ item: LegalUpdate }> = ({ item }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400">{item.title}</h3>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.date}</span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{item.summary}</p>
    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
      Source: <span className="text-gray-700 dark:text-gray-200">{item.source}</span>
    </div>
  </div>
);

const LegalFeed: React.FC = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-primary-500 pb-2">
          Latest Legal Updates
        </h2>
        <div className="space-y-6">
          {LEGAL_FEED_DATA.map(item => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalFeed;
