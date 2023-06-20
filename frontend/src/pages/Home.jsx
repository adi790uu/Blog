import React from 'react';

import Post from '../components/Post';
import '../App.css';
import { useEffect, useState } from 'react';
import api from '../api';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/posts/');
        console.log(response.data.posts);
        setPosts(response.data.posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const clickHandler = async () => {
    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.get(`/posts/search?keyword=${inputValue}`);
    console.log(response);
    if (response.data.resultPost.length === 0) {
      setPosts(response.data.resultUser);
    } else {
      setPosts(response.data.resultPost);
    }
  };

  return (
    <div className="bg-slate-200 w-screen flex flex-col justify-center items-center">
      <div className="relative flex items-center mt-20 mb-10 w-3/4 justify-center">
        <input
          className="bg-white text-gray-700 rounded-md py-1 md:py-2 px-3 md:px-4 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          type="text"
          placeholder="Search by Author or Title"
          onChange={handleInputChange}
          value={inputValue}
        />

        <button
          type="submit"
          onClick={clickHandler}
          className="ml-2 bg-blue-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Search
        </button>
      </div>

      <div className="w-3/4">
        {posts.map(post => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            creator={post.author._id}
            content={post.content}
            author={post.author.username}
            likes={post.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
