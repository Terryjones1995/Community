import React, { useEffect, useState } from 'react';
import api from '../axiosInstance'; // Import the axios instance
import { ChatIcon, SwitchHorizontalIcon, HeartIcon, XIcon } from '@heroicons/react/outline';
import TweetInput from './TweetInput';

const Tweet = ({ id, user, content, image, pollOptions, location, timestamp }) => {
  const [views, setViews] = useState(0);
  const [formattedTimestamp, setFormattedTimestamp] = useState('');
  const [replies, setReplies] = useState([]);
  const [reposts, setReposts] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isReplying, setIsReplying] = useState(false);
  const [isViewingComments, setIsViewingComments] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasReposted, setHasReposted] = useState(false);

  useEffect(() => {
    const updateTimestamp = () => {
      const timeDiff = Date.now() - new Date(timestamp);
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        setFormattedTimestamp(`${seconds} seconds ago`);
      } else if (minutes < 60) {
        setFormattedTimestamp(`${minutes} minutes ago`);
      } else if (hours < 24) {
        setFormattedTimestamp(`${hours} hours ago`);
      } else {
        setFormattedTimestamp(new Date(timestamp).toLocaleDateString());
      }
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [timestamp]);

  useEffect(() => {
    // Fetch the current tweet details from the backend (views, replies, likes, reposts)
    const fetchTweetDetails = async () => {
      try {
        const response = await api.get(`/tweets/${id}`);
        const { views, likes, reposts, replies } = response.data;

        setViews(views);
        setLikes(likes);
        setReposts(reposts);
        setReplies(replies);
      } catch (error) {
        console.error('Error fetching tweet details:', error);
      }
    };

    fetchTweetDetails();
  }, [id]);

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleRepost = async () => {
    if (!hasReposted) {
      try {
        await api.post(`/tweets/${id}/repost`);
        setReposts(reposts + 1);
        setHasReposted(true);
      } catch (error) {
        console.error('Error reposting tweet:', error);
      }
    }
  };

  const handleLike = async () => {
    if (!hasLiked) {
      try {
        await api.post(`/tweets/${id}/like`);
        setLikes(likes + 1);
        setHasLiked(true);
      } catch (error) {
        console.error('Error liking tweet:', error);
      }
    }
  };

  const handlePostReply = async (replyContent) => {
    try {
      const response = await api.post(`/tweets/${id}/reply`, { content: replyContent });
      setReplies([...replies, response.data]);
      setIsReplying(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleViewComments = () => {
    setIsViewingComments(true);
  };

  const handleClosePopup = () => {
    if (window.confirm("Cancel reply?")) {
      setIsReplying(false);
      setIsViewingComments(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <span className="font-bold text-white">{user}</span>
        <span className="text-gray-500 text-sm">{formattedTimestamp}</span>
      </div>
      <p className="text-white mt-2">{content}</p>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Tweet Image" className="rounded-lg max-h-80 w-full object-cover" />
        </div>
      )}
      {location && (
        <p className="mt-2 text-blue-400 text-sm">{location}</p>
      )}
      {pollOptions && pollOptions.length > 0 && (
        <div className="mt-4">
          {pollOptions.map((option, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded-lg text-white mb-2">
              {option}
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
        <span>{views} views</span>
        <div className="flex space-x-12">
          <button onClick={handleReply} className="flex items-center space-x-1 text-white">
            <ChatIcon className="w-5 h-5" />
            <span className="text-gray-500">{replies.length}</span>
          </button>
          <button onClick={handleRepost} className={`flex items-center space-x-1 ${hasReposted ? 'text-green-500' : 'text-white'}`}>
            <SwitchHorizontalIcon className="w-5 h-5" />
            <span className="text-gray-500">{reposts}</span>
          </button>
          <button onClick={handleLike} className={`flex items-center space-x-1 ${hasLiked ? 'text-red-500' : 'text-white'}`}>
            <HeartIcon className="w-5 h-5" />
            <span className="text-gray-500">{likes}</span>
          </button>
        </div>
      </div>

      {isReplying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-white" onClick={handleClosePopup}>
              <XIcon className="w-6 h-6" />
            </button>
            <TweetInput isReply={true} originalTweetUser={user} onPost={handlePostReply} />
          </div>
        </div>
      )}

      {isViewingComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-white" onClick={handleClosePopup}>
              <XIcon className="w-6 h-6" />
            </button>
            <div className="text-white">Comments</div>
            {replies.map((reply, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-lg text-white mb-2">
                {reply}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweet;
