const { Schema, model, Types } = require("mongoose");

// reaction defiued 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// define thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      type: [reactionSchema],
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// create thought model using the schema
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;