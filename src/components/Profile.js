import React from 'react';
import Tweet from './Tweet'; // Import the Tweet component

const Profile = ({ user, tweets }) => {
  return (
    <div className="profile-container">
      <h2>{user.name}</h2>
      <div className="user-tweets">
        {tweets.map((tweet, index) => (
          <Tweet key={index} content={tweet.content} author={user.name} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
