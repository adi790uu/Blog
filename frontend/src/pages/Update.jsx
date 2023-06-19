import React from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useRef } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Update = () => {
  let modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: [] },
      ],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
            'custom-color',
          ],
        },
      ],
    ],
  };

  var formats = [
    'header',
    'height',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'color',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'size',
  ];

  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get(`/posts/${postId}`);
      console.log(response);
      setContent(response.data.post.content);
      setTitle(response.data.post.title);
    };

    fetchData();
  }, []);

  const editorRef = useRef(null);

  const navigate = useNavigate();
  const handleUpdate = async () => {
    // Get the content from the editor
    const postContent = editorRef.current.value;
    const data = {
      title: title,
      content: postContent,
    };

    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.put(`/posts/${postId}`, data);

    console.log(response);
    alert('Post updated!');

    navigate('/home');
  };

  const handleReset = () => {
    // Clear the content and reset the editor
    setTitle('');
    editorRef.current.getEditor().setContents([]);
  };

  return (
    <div>
      <div style={{ display: 'grid', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-3/4 mx-auto mt-20 outline-2 border-solid border-2  p-5 rounded-lg"
        ></input>
        <ReactQuill
          value={content}
          ref={editorRef}
          className="w-screen p-10"
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ...."
          style={{ height: '500px' }}
        ></ReactQuill>
      </div>
      <div className="flex gap-2 mt-10 justify-evenly w-3/4 mx-auto">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Update;
