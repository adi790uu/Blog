const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const Comment = require('../models/commentSchema');

const postLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user;
  const post = await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } });
  const likesArrayInUser = await User.updateOne(
    { _id: userId },
    { $push: { likes: postId } },
  );

  const updatedPost = await Post.findById(postId);

  if (post && likesArrayInUser) {
    return res.json({
      msg: 'Success',
      updatedPost: updatedPost,
      userInfo: likesArrayInUser,
    });
  }

  res.json({ msg: 'Error occured' });
};

const removeLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user;
  const post = await Post.updateOne({ _id: postId }, { $inc: { likes: -1 } });
  const likesArrayInUser = await User.updateOne(
    { _id: userId },
    { $push: { likes: postId } },
  );

  const updatedPost = await Post.findById(postId);

  if (post && likesArrayInUser) {
    return res.json({
      msg: 'Success',
      updatedPost: updatedPost,
      userInfo: likesArrayInUser,
    });
  }

  res.json({ msg: 'Error occured' });
};

const postComment = async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  const { content } = req.body;
  const userId = req.user;
  const comment = await Comment.create({
    author: userId,
    content: content,
    post: postId,
  });

  if (comment) {
    const post = await Post.findById(postId);
    post.comments.push(comment);
    await post.save();

    return res.json({
      msg: 'Success',
      updatedPost: post,
      comment: comment,
    });
  }
  res.json({ msg: 'Some error ocurred' });
};

const postFavorite = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user;

  const user = await User.findById(userId);
  user.favorites.push(postId);
  await user.save();

  if (user) {
    return res.json({ msg: 'Success', user: user });
  }
  res.json({ msg: 'Failed' });
};

module.exports = { postLike, postComment, postFavorite, removeLike };
