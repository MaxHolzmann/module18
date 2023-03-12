const router = require('express').Router();
const {
  getThoughts,
  getUsersThought,
  createThought,
  updateThought,
  createReaction,
  delReaction
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:userId').get(getUsersThought);

router.route('/:thoughtId').put(updateThought)

router.route("/:thoughtId/reactions").post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(delReaction)

module.exports = router;
