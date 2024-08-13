const { User, Thought } = require("../models");

module.exports = {
  // Get All Users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Something went wrong!, Please try again later." });
    }
  },

  // Get Single User
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Something went wrong!, No user found." });
    }
  },

  // Create New User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({
          message:
            "Error creating user. Please check your input and try again.",
        });
    }
  },

  // Update User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message:
          "Something went wrong!, Error updating user. Please check your input and try again.",
      });
    }
  },

  // Delete User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      await Thought.deleteMany({ username: user.username });
      res.json({ message: "User thoughts deleted." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Something went wrong!, Unable to delete user" });
    }
  },

  // Add a Friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Something went wrong!, Unable to add friend." });
    }
  },

  // Remove a Friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Something went wrong!, Unable to delete friend." });
    }
  },
};
