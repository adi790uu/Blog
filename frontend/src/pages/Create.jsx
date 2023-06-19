import React from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useRef } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const TextEditor = () => {
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

  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const handlePost = async () => {
    // Get the content from the editor
    const postContent = editorRef.current.value;
    // TODO: Perform actions to post the content to the backend or handle it as needed
    // console.log('Posting content:', postContent);
    // console.log('Title:', title);

    const data = {
      title: title,
      content: postContent,
    };
    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.post('/posts', data);
    console.log(response);
    alert('Post created');
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
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
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

export default TextEditor;
