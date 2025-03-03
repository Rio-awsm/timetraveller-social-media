import { ArrowPathRoundedSquareIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const Post = ({ post, isLiked, onLike }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  
  const getPersonaIcon = (persona) => {
    if (!persona) return '👤';
    
    persona = persona.toLowerCase();
    
    if (persona.includes('politician')) return '🏛';
    if (persona.includes('conspiracy')) return '🏴‍☠️';
    if (persona.includes('comedian')) return '🤡';
    if (persona.includes('scholar')) return '🎓';
    if (persona.includes('citizen')) return '👨‍👩‍👧‍👦';
    if (persona.includes('celebrity')) return '⭐';
    if (persona.includes('journalist')) return '📰';
    if (persona.includes('religious')) return '✝️';
    
    return '👤';
  };

  const getAvatarColor = () => {
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
      setComments([...comments, { text: comment, user: 'TimeExplorer', timestamp: 'Just now' }]);
      setComment('');
    }
  };
  
  const getPlatformStyle = () => {
    return "rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200";
  };
  
  return (
    <div className={`bg-white p-5 ${getPlatformStyle()}`}>
      <div className="flex items-start mb-4">
        <div className={`text-2xl rounded-full p-3 mr-3 ${getAvatarColor()}`}>
          {getPersonaIcon(post.persona)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900">{post.username}</div>
              <div className="text-gray-500">@{post.handle || post.username.replace(/\s+/g, '_').toLowerCase()}</div>
            </div>
            {post.persona && (
              <div className="text-xs bg-gray-100 text-gray-800 rounded-full px-3 py-1 font-medium">
                {post.persona}
              </div>
            )}
          </div>
        </div>
      </div>
      
      
      <div className="mb-4">
        <p className="whitespace-pre-line text-gray-800 text-lg">{post.content}</p>
        
       
        {post.hashtag && (
          <p className="text-indigo-600 mt-2 font-medium">
            #{post.hashtag.replace(/^#/, '')}
          </p>
        )}
      </div>
      
      
      <div className="text-gray-500 text-sm mb-3">
        {post.timestamp}
      </div>
      
      
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between">
          <button 
            onClick={onLike}
            className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition duration-200`}
          >
            {isLiked ? <HeartSolidIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
            <span>{isLiked ? (parseInt(post.likes || 0) + 1) : post.likes || 0}</span>
          </button>
          
          <button 
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition duration-200"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span>{comments.length}</span>
          </button>
          
          <div className="flex items-center gap-1 text-gray-500">
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            <span>{post.shares || 0}</span>
          </div>
        </div>
      </div>
      
      {/* Comment form */}
      {showCommentForm && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition duration-200"
            >
              Post
            </button>
          </form>
          
          {/* Comments */}
          {comments.length > 0 && (
            <div className="mt-3 space-y-2">
              {comments.map((c, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-semibold">{c.user}</div>
                  <div>{c.text}</div>
                  <div className="text-xs text-gray-500 mt-1">{c.timestamp}</div>
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