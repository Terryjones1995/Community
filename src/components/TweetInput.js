import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';
import { PhotographIcon, ChartBarIcon, EmojiHappyIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const TweetInput = ({ onPost, isReply, originalTweetUser }) => {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '', '']);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const handleTweet = () => {
    if (onPost && content) {
      const newTweet = {
        content: isReply ? `@${originalTweetUser} ${content}` : content,
        image,
        pollOptions: pollOptions.filter(option => option.trim() !== ''),
        location,
      };

      onPost(newTweet);
      setContent('');
      setImage(null);
      setPollOptions(['', '', '']);
      setLocation(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`City, Country`);  // Placeholder for actual city and country
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setContent(content + emoji);
    setShowEmojiPicker(false);
  };

  const handlePollOptionChange = (index, value) => {
    const newPollOptions = [...pollOptions];
    newPollOptions[index] = value;
    setPollOptions(newPollOptions);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4 w-full max-w-2xl mx-auto"> {/* Adjusted the width */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={isReply ? "Repost reply" : "What's happening?"}
        className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white resize-none"
      />

      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-blue-500">
            <EmojiHappyIcon className="w-6 h-6" />
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <PhotographIcon className="w-6 h-6 text-blue-500 cursor-pointer" />
          </label>
          <button onClick={handleLocation} className="text-blue-500">
            <LocationMarkerIcon className="w-6 h-6" />
          </button>
          <button onClick={() => alert('Poll functionality coming soon!')} className="text-blue-500">
            <ChartBarIcon className="w-6 h-6" />
          </button>
        </div>
        <button
          onClick={handleTweet}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
        >
          {isReply ? "Reply" : "Post"}
        </button>
      </div>

      {showEmojiPicker && (
        <EmojiPicker onSelect={handleEmojiSelect} />
      )}

      {pollOptions.some(option => option) && (
        <div className="mt-4">
          {pollOptions.map((option, index) => (
            <input
              key={index}
              value={option}
              onChange={(e) => handlePollOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="w-full p-2 border border-gray-600 rounded-lg mb-2 bg-gray-700 text-white"
            />
          ))}
        </div>
      )}

      {image && (
        <div className="mt-4">
          <img src={image} alt="Tweet Image" className="rounded-lg max-h-80 w-full object-cover" />
        </div>
      )}

      {location && (
        <p className="mt-4 text-blue-400 text-sm">{location}</p>
      )}
    </div>
  );
};

export default TweetInput;
