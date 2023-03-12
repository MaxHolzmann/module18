const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  async updateUser(req, res) {
    let updatedUser = await User.updateOne({_id: req.params.userId}, {
      username: req.body.username,
      email: req.body.email
    })
    res.status(200).json(updatedUser)
  },
 async delUser(req, res) {
    let delUser = await User.deleteOne({_id: req.params.userId})
    res.status(200).json(delUser)
  },
  async addFriend(req, res) {
    let addFriend = await User.updateOne(
      {_id: req.params.userId}, 
      {$push: {friends: req.params.friendId}}
      )
      res.status(200).json(addFriend)
  },
  async delFriend(req, res) {
    let delFriend = await User.updateOne(
      {_id: req.params.userId}, 
      {$pull: {friends: req.params.friendId}}
      )
      res.status(200).json(delFriend)
  } 
};

