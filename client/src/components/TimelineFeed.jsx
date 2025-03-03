import React, { useState } from 'react';
import Post from './Post';

const TimelineFeed = ({ event, posts }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [view, setView] = useState('feed');
  
  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };
  
  const postsWithIds = posts.map((post, index) => ({
    ...post,
    id: `post-${index}`
  }));
  
  return (
    <div>
      <div className="flex mb-6 bg-white rounded-t-xl shadow-sm border border-gray-100 overflow-y-auto">
        <button
          onClick={() => setView('feed')}
          className={`flex-1 py-3 px-6 text-center font-medium ${
            view === 'feed' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Social Feed
        </button>
        <button
          onClick={() => setView('event')}
          className={`flex-1 py-3 px-6 text-center font-medium ${
            view === 'event' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Event Details
        </button>
      </div>
      
      {view === 'event' ? (
        <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">{event?.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-700">Date</p>
              <p>{event?.date}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-700">Location</p>
              <p>{event?.location}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Description</h3>
            <p className="bg-gray-50 p-4 rounded-lg leading-relaxed">{event?.description}</p>
          </div>
          
          {event?.keyFigures && event.keyFigures.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Key Figures</h3>
              <div className="flex flex-wrap gap-2">
                {event.keyFigures.map((figure, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    {figure}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-indigo-700">{event?.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{event?.date} • {event?.location}</p>
          </div>
          
          {postsWithIds.map((post) => (
            <Post 
              key={post.id}
              post={post}
              isLiked={likedPosts[post.id]}
              onLike={() => handleLike(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineFeed;