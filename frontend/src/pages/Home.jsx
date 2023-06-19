import React from 'react';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import '../App.css';
import { useEffect, useState } from 'react';
import api from '../api';
const Home = () => {
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

  return (
    <div className="bg-slate-300 w-screen flex flex-col justify-center items-center">
      <div className="w-3/4">
        {posts.map(post => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            creator={post.author}
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
