//Importing the User and Thought models
const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong!, Please try again later." });
    }
  },

    // Get Single user
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
          return res.status(500).json({ message: "Something went wrong!, No user found." });
        }
      },
    
    // create user
    
    // update user
    
    // delete user
    
    // add friend
    
    
    // delete friend


};