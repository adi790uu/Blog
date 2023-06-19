const Post = require('../models/postSchema');
const User = require('../models/userSchema');

const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).populate('author');

  if (posts) {
    return res.json({ msg: 'Success', posts: posts });
  }
  res.json({ msg: 'Unsuccessful' });
};

const getPost = async (req, res) => {
  const postId = req.params.id;
  // console.log(postId);

  const post = await Post.findById(postId)
    .populate('comments')
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

  if (post) {
    return res.json({ msg: 'Post found', post: post });
  }
  res.json({ msg: 'Post not found!' });
};

const publishPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user;
  const createdPost = await Post.create({ author: req.user, title, content });

  if (createdPost) {
    const user = await User.findById(userId);
    user.postsCreated.push(createdPost._id);
    await user.save();
    return res.json({ msg: 'Post Published!', post: createdPost });
  }
  res.json({ msg: 'Error occured while publishing post' });
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  const post = await Post.findById(postId);

  if (post) {
    post.title = title;
    post.content = content;
    const updatedPost = await post.save();
    return res.json({ msg: 'Post updated', post: updatedPost });
  }
  res.json({ msg: 'Post updation failed, please Retry' });
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const deletePost = await Post.findByIdAndDelete(postId);

  if (deletePost) {
    return res.json({ msg: 'Post deleted successfully' });
  }

  res.json({ msg: 'Some error occured' });
};

const getSearchedResult = async (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);

  const posts = await Post.find()
    .populate({
      path: 'author',
      match: { username: { $regex: keyword, $options: 'i' } },
    })
    .exec();

  const filteredPosts = posts.filter(post => post.author !== null);

  // console.log(filteredPosts);

  // const searchResult1 = await User.find({
  //   username: { $regex: keyword, $options: 'i' },
  // });

  const searchResult2 = await Post.find({
    title: { $regex: keyword, $options: 'i' },
  });

  // console.log(searchResult1);
  // console.log(searchResult2);

  // if (searchResult) {
  //   return res.json({ msg: 'Success', results: searchResult });
  // }
  if (searchResult2 || filteredPosts) {
    return res.json({
      msg: 'Success',
      resultUser: filteredPosts,
      resultPost: searchResult2,
    });
  }

  res.json({ msg: 'Invalid request' });
};

module.exports = {
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  publishPost,
  getSearchedResult,
};
