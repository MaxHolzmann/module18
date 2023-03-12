const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  delUser,
  addFriend,
  delFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(delUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(delFriend)

module.exports = router;
