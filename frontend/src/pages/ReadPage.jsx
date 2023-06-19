// import React, { useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import api from '../api';
// import myImage from '../images/download.jpeg';
// import { useState } from 'react';
// const ReadPage = () => {
//   const { postId } = useParams();
//   console.log(postId);
//   const [post, setPost] = useState({});
//   const [date, setDate] = useState('');
//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('token');
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const response = await api.get(`/posts/${postId}`);
//       // console.log(response.data);
//       setPost(response.data.post);
//       const newDate1 = response.data.post.createdAt;
//       const newDate2 = newDate1.split('T');

//       setDate(newDate2[0]);
//       //   console.log(newDate1);
//       //   const newDate2 = new Date(newDate1);
//       //   const formattedDate = newDate2.toLocaleDateString.String();
//       //   setDate(formattedDate);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col items-center bg-slate-50">
//       <h1 className="text-5xl font-medium text-center mt-28 mb-28">
//         {post.title}
//       </h1>
//       <img src={myImage} className="w-96 h-96 mb-24 " loading="lazy" />

//       <div className="flex justify-evenly w-2/3 align-items-center">
//         {post.author && (
//           <span className="font-md text-md font-semibold">
//             Written by: {post.author.username}
//           </span>
//         )}
//         <span className="italic font-semibold text-md">Published: {date}</span>
//       </div>
//       <p className="mt-20 mb-20 p-10 text-center spa leading-8 font-sans text-lg">
//         {post.content} safsdfasjfjsadfjsdjfjsdfjjdfjdff Lorem ipsum dolor sit,
//         amet consectetur adipisicing elit. Architecto eveniet ad voluptatem
//         laborum voluptatum in repudiandae illo sit cum, quam praesentium
//         mollitia asperiores placeat. Dolore, eius ut. Optio obcaecati nostrum
//         maxime nulla porro, quidem dicta saepe voluptas dolor reiciendis modi
//         eum commodi cumque totam ea, voluptatibus veritatis eaque possimus
//         consequatur est odio delectus? Itaque officia eaque ratione odit fugit.
//         Quos libero ad molestiae? Quibusdam vitae itaque tenetur nulla nemo
//         totam voluptatum adipisci repellendus animi perferendis dolore incidunt
//         voluptatibus fugit quidem aut, obcaecati delectus distinctio non sint
//         velit quisquam sequi veniam. Necessitatibus rerum aperiam ipsam,
//         consequatur impedit fuga optio cupiditate ullam.
//       </p>
//     </div>
//   );
// };

// export default ReadPage;

import React, { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get(`/posts/${postId}`);
      setPost(response.data.post);
      const newDate1 = response.data.post.createdAt;
      const newDate2 = newDate1.split('T');
      setDate(newDate2[0]);
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = DOMPurify.sanitize(post.content);
    }
  }, [post]);

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
    alert('Comment posted!');
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
        <div ref={contentRef} className="mt-20 mb-20 p-10 spa leading-8"></div>
      </div>
      <div className="p-10 w-full bg-slate-700">
        <h1 className="mb-10 text-lg font-semibold text-slate-200">
          Comments :
        </h1>
        <div className="flex-shrink-0 mb-4 md:mr-8 ">
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
      </div>
    </>
  );
};

export default ReadPage;
