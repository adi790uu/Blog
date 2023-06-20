import React from 'react';
import api from '../api';
import { useEffect } from 'react';
import { useState } from 'react';
import myImage from '../images/download.jpeg';
import Post from '../components/Post';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get(`/users/user?keyword=${userId}`);
      console.log(response);
      setProfile(response.data.user);
    };

    fetchData();
  }, []);

  const editHandler = e => {
    const postId = e.target.id;
    navigate(`/update/${postId}`);
  };

  return (
    <div className="bg-gray-200 p-8 rounded-lg">
      {profile ? (
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex-shrink-0 mb-4 md:mr-8">
            <img
              src={myImage}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-3/4">
            <h2 className="text-2xl font-semibold mb-4">{profile.username}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Favorite Posts</h3>
              <ul className="list-disc list-inside">
                {profile.favorites.map(post => (
                  <li key={post._id}>{post.title}</li>
                ))}
              </ul>
            </div>
            <div className="mt-52 w-full mb-10">
              <h2>Your Posts :</h2>
              <ul className="">
                {profile.postsCreated.map(post => (
                  <div className="relative">
                    <Post
                      key={post._id}
                      id={post._id}
                      title={post.title}
                      content={post.content}
                      creator={post.author}
                      author={profile.username}
                      likes={post.likes}
                    />
                    <button
                      id={post._id}
                      type="submit"
                      onClick={editHandler}
                      className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
