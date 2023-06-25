import React, { useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import api from '../api';
import DOMPurify from 'dompurify';
import myImage from '../images/download.jpeg';
import { useState } from 'react';

const ReadPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const contentRef = useRef(null);
  const [comm, setComm] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get(`/posts/${postId}`);
      setPost(response.data.post);
      const newDate1 = response.data.post.createdAt;
      const newDate2 = newDate1.split('T');
      setDate(newDate2[0]);
      setComm(response.data.post.comments);
      // console.log(response.data.post.comments);
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = DOMPurify.sanitize(post.content);
    }
    console.log(comm);
  }, [post, comm]);

  const commentChange = e => {
    setComment(e.target.value);
  };

  const postCommentHandler = async () => {
    const data = {
      content: comment,
    };

    // const content = comment;
    console.log(comment);

    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.post(`/feedback/comment/${postId}`, data);
    console.log(response);
    // alert('Comment posted!');
    window.location.reload(false);
  };

  return (
    <>
      <div className="flex flex-col items-center bg-slate-50">
        <h1 className="text-5xl font-medium text-center mt-28 mb-28">
          {post.title}
        </h1>
        <img src={myImage} className="w-96 h-96 mb-24" loading="lazy" />

        <div className="flex justify-evenly w-2/3 align-items-center">
          {post.author && (
            <span className="font-md text-md font-semibold">
              Written by: {post.author.username}
            </span>
          )}
          <span className="italic font-semibold text-md">
            Published: {date}
          </span>
        </div>
      </div>

      <div ref={contentRef} className="mt-20 mb-20 p-10 leading-8"></div>
      <div className="p-10 w-full bg-slate-700">
        <h1 className="mb-10 text-lg font-semibold text-slate-200">
          Comments :
        </h1>
        <div className="flex-shrink-0 mb-4 md:mr-8 flex justify-center items-center">
          <img
            src={myImage}
            alt="Profile"
            className="w-12 h-12 rounded-full inline"
          />
          <input
            className="border-2 border-gray-700 rounded-md w-3/4 ml-4 h-12 p-3 bg-slate-50 "
            type="text"
            placeholder="Comment here..."
            value={comment}
            onChange={commentChange}
          ></input>
          <button
            type="submit"
            className="text-slate-200  bg-blue-950 rounded-lg w-12 h-7 ml-3 hover:bg-blue-700"
            onClick={postCommentHandler}
          >
            Post
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mx-auto">
          {comm.map(comment => (
            <Comment
              key={comment._id}
              author={comment.author.username}
              createdAt={comment.createdAt}
              content={comment.content}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadPage;
