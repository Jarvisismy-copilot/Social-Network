const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({
        error: "Something went wrong!, Failed to retrieve thoughts",
        details: err,
      });
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Not able to retrieve thought" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({
        error: "Something went wrong!, Not able to retrieve thought",
        details: err,
      });
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Something went wrong!, Thought failed to be created",
        details: err,
      });
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!, Thought not updated",
        details: error,
      });
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong!, Failed to delete thought", details: err });
    }
  },

  // Add reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong!, Failed to add reaction", details: err });
    }
  },

  // Delete reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json(thought);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Something went wrong!, Failed to remove reaction", details: err });
    }
  },
};
