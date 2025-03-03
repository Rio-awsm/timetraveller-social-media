import React from 'react';

const RecentTimelines = ({ timelines, onSelect }) => {
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-3 text-indigo-700">Recent Timelines</h3>
      
      <div className="space-y-3">
        {timelines.map(timeline => (
          <div 
            key={timeline.id}
            onClick={() => onSelect(timeline.id)}
            className="p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 cursor-pointer transition duration-200 border border-gray-100"
          >
            <div className="text-sm font-medium">{timeline.title}</div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gray-500">{timeline.period}</div>
              <div className="text-xs text-gray-400">{formatRelativeTime(timeline.date)}</div>
            </div>
            <div className="mt-1">
              <span className="inline-block text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                {timeline.platform}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTimelines;