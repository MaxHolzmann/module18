const { Schema, model, Mongoose } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: Schema.Types.ObjectId
    },
    reactionBody: {
        type: Schema.Types.String,
    },
    username: {
        type: Schema.Types.String,
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    }
})

const thoughtSchema = new Schema(
  {
    thoughtText: String,
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    },
    username: 
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    reactions: [
      {
        type: reactionSchema
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema.virtual('reactionsCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    this.set({ reactionsCount: reactions.length });
  });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;