import React from 'react';
import image from '../images/download.jpeg';
const Comment = props => {
  const username = props.author;
  const createdAt = props.createdAt;
  const content = props.content;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-2/4 mt-7">
      <div className="flex items-center mb-2">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={image}
          alt="User Avatar"
        />
        <div>
          <h4 className="text-gray-800 font-semibold">{username}</h4>
          <p className="text-gray-600 text-sm">Posted on {createdAt}</p>
        </div>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Comment;
