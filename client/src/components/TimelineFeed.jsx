import React, { useState } from 'react';
import { platformStyles } from '../Constants';
import Post from './Post';

const TimelineFeed = ({ event, posts, platform ='TikTok' }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [view, setView] = useState('feed');
  
  const styles = platformStyles[platform] || platformStyles.Twitter;
  
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
    <div className={`${styles.feed.background} rounded-xl shadow-md`}>
      <div className={`flex mb-0 rounded-t-xl overflow-hidden ${styles.feed.headerBackground}`}>
        <button
          onClick={() => setView('feed')}
          className={`flex-1 py-3 px-6 text-center font-medium transition-all duration-200 ${
            view === 'feed' 
              ? styles.feed.tabActive 
              : styles.feed.tabInactive
          }`}
        >
          Social Feed
        </button>
        <button
          onClick={() => setView('event')}
          className={`flex-1 py-3 px-6 text-center font-medium transition-all duration-200 ${
            view === 'event' 
              ? styles.feed.tabActive 
              : styles.feed.tabInactive
          }`}
        >
          Event Details
        </button>
      </div>
      
      {view === 'event' ? (
        <div className={`p-6 ${styles.feed.background}`}>
          <h2 className={`text-2xl font-bold mb-4 ${styles.feed.headerText === 'text-white' ? 'text-white' : 'text-indigo-700'}`}>
            {event?.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className={`${platform === 'TikTok' ? 'bg-gray-900 text-white' : 'bg-gray-50'} p-4 rounded-lg`}>
              <p className={`font-semibold ${platform === 'TikTok' ? 'text-gray-300' : 'text-gray-700'}`}>Date</p>
              <p>{event?.date}</p>
            </div>
            <div className={`${platform === 'TikTok' ? 'bg-gray-900 text-white' : 'bg-gray-50'} p-4 rounded-lg`}>
              <p className={`font-semibold ${platform === 'TikTok' ? 'text-gray-300' : 'text-gray-700'}`}>Location</p>
              <p>{event?.location}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-2 ${styles.feed.headerText === 'text-white' ? 'text-white' : 'text-gray-700'}`}>
              Description
            </h3>
            <p className={`${platform === 'TikTok' ? 'bg-gray-900 text-white' : 'bg-gray-50'} p-4 rounded-lg leading-relaxed`}>
              {event?.description}
            </p>
          </div>
          
          {event?.keyFigures && event.keyFigures.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${styles.feed.headerText === 'text-white' ? 'text-white' : 'text-gray-700'}`}>
                Key Figures
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.keyFigures.map((figure, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      platform === 'TikTok' 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {figure}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`${styles.feed.background} rounded-b-xl`}>
          <div className={`p-4 ${platform === 'TikTok' ? 'bg-black' : 'bg-indigo-50'} border-b ${styles.feed.border}`}>
            <h3 className={`font-bold ${platform === 'TikTok' ? 'text-white' : 'text-indigo-700'}`}>
              {event?.title}
            </h3>
            <p className={`text-sm mt-1 ${platform === 'TikTok' ? 'text-gray-400' : 'text-gray-600'}`}>
              {event?.date} • {event?.location}
            </p>
          </div>
          
          {postsWithIds.map((post) => (
            <Post 
              key={post.id}
              post={post}
              isLiked={likedPosts[post.id]}
              onLike={() => handleLike(post.id)}
              platform={platform}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineFeed;