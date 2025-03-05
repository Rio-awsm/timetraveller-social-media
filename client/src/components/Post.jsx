import { ArrowPathRoundedSquareIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { platformPostStyles } from '../Constants';



const Post = ({ post, isLiked, onLike, platform = 'TikTok' }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  
  const styles = platformPostStyles[platform] || platformPostStyles.Twitter;
  
  const getPersonaIcon = (persona) => {
    if (!persona) return '👤';
    
    persona = persona.toLowerCase();
    
    const iconMap = {
      'politician': '🏛',
      'conspiracy': '🏴‍☠️',
      'comedian': '🤡',
      'scholar': '🎓',
      'citizen': '👨‍👩‍👧‍👦',
      'celebrity': '⭐',
      'journalist': '📰',
      'religious': '✝️'
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (persona.includes(key)) return icon;
    }
    
    return '👤';
  };

  const getAvatarColor = () => {
    if (platform === 'TikTok') return 'bg-gray-900 text-white';
    
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
      'bg-teal-100 text-teal-800'
    ];
 
    const sum = post.username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };
  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { 
        text: comment, 
        user: 'TimeExplorer', 
        timestamp: 'Just now' 
      }]);
      setComment('');
    }
  };
  
  return (
    <div className={`p-5 ${styles.background} ${styles.border}`}>
      <div className="flex items-start mb-4">
        <div className={`text-2xl rounded-full p-3 mr-3 ${getAvatarColor()}`}>
          {getPersonaIcon(post.persona)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className={`${styles.usernameColor}`}>{post.username}</div>
              <div className={`text-xs ${styles.handleColor}`}>
                {post.handle || post.username.replace(/\s+/g, '_').toLowerCase()}
              </div>
            </div>
            {post.persona && (
              <div className={`text-xs ${platform === 'TikTok' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} rounded-full px-3 py-1 font-medium`}>
                {post.persona}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className={`whitespace-pre-line ${styles.contentColor} text-lg`}>
          {post.content}
        </p>
        
        {post.hashtag && (
          <p className={`mt-2 font-medium ${platform === 'Twitter' ? 'text-[#1DA1F2]' : 'text-indigo-600'}`}>
            #{post.hashtag.replace(/^#/, '')}
          </p>
        )}
      </div>
      
      <div className={`text-sm mb-3 ${platform === 'TikTok' ? 'text-gray-400' : 'text-gray-500'}`}>
        {post.timestamp}
      </div>
      
      <div className={`pt-3 ${platform === 'TikTok' ? 'border-t border-gray-800' : 'border-t border-gray-100'}`}>
        <div className="flex justify-between">
          <button 
            onClick={onLike}
            className={`flex items-center gap-1 ${styles.likeIconColor} transition duration-200`}
          >
            {isLiked ? <HeartSolidIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
            <span>{isLiked ? (parseInt(post.likes || 0) + 1) : post.likes || 0}</span>
          </button>
          
          <button 
            onClick={() => setShowCommentForm(!showCommentForm)}
            className={`flex items-center gap-1 ${styles.iconColor} transition duration-200`}
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span>{comments.length}</span>
          </button>
          
          <div className={`flex items-center gap-1 ${styles.iconColor}`}>
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            <span>{post.shares || 0}</span>
          </div>
        </div>
      </div>
      
      {showCommentForm && (
        <div className={`mt-4 pt-3 ${platform === 'TikTok' ? 'border-t border-gray-800' : 'border-t border-gray-100'}`}>
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className={`flex-1 p-2 ${styles.commentInputBg} ${styles.commentInputBorder} border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            <button 
              type="submit"
              className={`${platform === 'Twitter' ? 'bg-[#1DA1F2]' : 
                           platform === 'Facebook' ? 'bg-[#1877F2]' : 
                           platform === 'Reddit' ? 'bg-[#FF4500]' : 
                           platform === 'Instagram' ? 'bg-gradient-to-r from-[#405DE6] to-[#BE2B7B]' : 
                           'bg-[#FF0050]'} 
              text-white px-3 py-1 rounded-lg transition duration-200`}
            >
              Post
            </button>
          </form>
          
          {comments.length > 0 && (
            <div className="mt-3 space-y-2">
              {comments.map((c, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg ${
                    platform === 'TikTok' ? 'bg-gray-900 text-white' : 
                    platform === 'Facebook' ? 'bg-gray-100' : 
                    platform === 'Reddit' ? 'bg-gray-50' : 
                    platform === 'Instagram' ? 'bg-gray-100' : 
                    'bg-gray-50'
                  }`}
                >
                  <div className={`font-semibold ${styles.usernameColor}`}>{c.user}</div>
                  <div className={styles.contentColor}>{c.text}</div>
                  <div className={`text-xs mt-1 ${styles.handleColor}`}>{c.timestamp}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;