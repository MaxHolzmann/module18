const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getUsersThought(req, res) {
    Thought.findOne({ username: req.params.userId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that user ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
async createThought(req, res) {
    try {
    const thoughtData = await Thought.create(req.body)
        await User.updateOne({_id: thoughtData.username}, {$push: {thoughts: thoughtData._id}})
        res.status(200).json(thoughtData)
        }
     catch (err) {
        res.status(404).json(err)
    }
  },
async updateThought(req, res) {
  try {
    const updateThought = await Thought.updateOne({_id: req.params.thoughtId}, {
      thoughtText: req.body.thoughtText,
      username: req.body.username
    })
    res.status(200).json(updateThought)
  } catch (err) {
    res.status(404).json(err)
  }
},
async createReaction(req, res) {
    try {
    let reaction = await Thought.updateOne(
        {_id: req.params.thoughtId}, 
        {$push: {reactions: req.body}}
        )
            res.status(200).json(reaction)     
    } catch (err) {
        res.status(404).json(err)
    }
},
async delReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const thought = await Thought.findOne({ _id: thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: `Thought with id ${thoughtId} not found.` });
      }
  
      thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
      await thought.save();
  
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}
