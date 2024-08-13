import React from 'react';
import Feed from '../components/Feed';
import RightSidebar from '../components/RightSidebar';

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-2/3 xl:w-3/4 mx-auto lg:mx-0">
          <Feed />
        </div>
        <div className="hidden lg:block lg:w-1/3 xl:w-1/4">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
