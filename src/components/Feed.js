import React, { useState } from 'react';
import Tweet from './Tweet';
import TweetInput from './TweetInput';

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  const addTweet = (newTweet) => {
    const tweet = {
      id: tweets.length + 1,
      user: 'You',
      timestamp: new Date(), // Fixing the timestamp issue by using the Date object
      ...newTweet, // Spread newTweet object to include all tweet properties (content, image, pollOptions, etc.)
    };
    setTweets([tweet, ...tweets]);
  };

  return (
    <div className="flex justify-center w-full pt-4">
      <div className="w-full max-w-2xl">
        <TweetInput onPost={addTweet} />
        {tweets.map((tweet) => (
          <Tweet 
            key={tweet.id} 
            user={tweet.user} 
            content={tweet.content} 
            image={tweet.image}
            pollOptions={tweet.pollOptions} 
            location={tweet.location} 
            timestamp={tweet.timestamp} // Passing the timestamp to the Tweet component
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
