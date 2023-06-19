// import React from 'react';
import myImage from '../images/download.jpeg';
import api from '../api';

// const Post = props => {
//   return (
//     <div className="flex flex-col justify-center items-center m-40 border-solid border-black p-10">
//       <a
//         href="/post"
//         className="linker flex flex-col items-center justify-center w-screen"
//       >
//         <div className="w-100">
//           <img src={myImage} className="w-96"></img>
//         </div>
//         <h2 className="text-4xl font-medium text-black p-6">Title</h2>
//       </a>
//       <p className="text-black description">Content</p>
//     </div>
//   );
// };

// export default Post;

import React from 'react';
import { useState } from 'react';

const PostCard = props => {
  const postId = `/readArticle/${props.id}`;
  const [likes, setLikes] = useState(props.likes);
  const [count, setCount] = useState(0);

  const favoriteHandler = async () => {
    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.post(`/feedback/favorite/${props.id}`);
    console.log(response);
    alert('Added to favorites!');
  };

  const likeHandler = async () => {
    if (count === 0) {
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.post(`/feedback/like/${props.id}`);
      setLikes(response.data.updatedPost.likes);
      setCount(1);
    } else {
      alert('Already liked the post');
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-indigo-200 rounded-md shadow-md overflow-hidden my-4 md:my-8">
      <div className="md:flex flex flex-col ">
        <div className="flex items-center justify-center md:flex-shrink-0 h-80 bg-slate-800">
          <img
            className="max-w-full max-h-full object-cover md:h-auto md:w-56 bg-cover"
            src={myImage}
            alt="Post Image"
          />
        </div>
        <div className="p-14 space-y-4 md:space-y-2 flex flex-col items-center justify-center bg-slate-300">
          <a
            href="#"
            className="text-slate-700 underline cursor-pointer relative bottom-7 italic font-medium tracking-wide"
          >
            Author: {props.author}
          </a>
          <a
            href={postId}
            className="block text-2xl leading-tight font-medium text-black hover:underline"
          >
            {props.title}
          </a>
          <p className="text-gray-500">{props.content}</p>
          <div className="flex items-center justify-between w-3/4">
            <div className="w-16 flex justify-evenly">
              <span>{likes}</span>
              <button
                className="flex items-center text-gray-600 hover:text-blue-500"
                onClick={likeHandler}
              >
                Like
              </button>
            </div>
            <div>
              <button
                className="flex items-center hover:text-red-500"
                onClick={favoriteHandler}
              >
                Favorite
              </button>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
