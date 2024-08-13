import React from 'react';

const RightSidebar = () => {
  return (
    <div className="hidden lg:block bg-gray-900 p-4 rounded-lg space-y-4 w-full">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-white font-bold mb-2">What's happening</h2>
        <p className="text-gray-400">Trending in [Location]</p>
        <p className="text-white">#[Trending Topic]</p>
        <p className="text-gray-400">[Post Count] posts</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-white font-bold mb-2">Who to follow</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-600 w-10 h-10 rounded-full" />
            <div>
              <p className="text-white">[User Name]</p>
              <p className="text-gray-400">@[username]</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white py-1 px-3 rounded-lg">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
