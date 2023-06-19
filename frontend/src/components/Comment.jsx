import React from 'react';
import api from '../api';
const Comment = () => {
  const postId = props.postId;
  useEffect(() => {
    fetchComments = async () => {
      const response = await api.get(`/posts/${postId}`);
    };
  }, []);

  return <div></div>;
};

export default Comment;
