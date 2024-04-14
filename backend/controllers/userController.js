const User = require('../models/userModel')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
/*const getUsers = async(req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}

const getUser = async(req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such  user'})
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  
  res.status(200).json(user)
}

const createUser = async(req, res) => {
  console.log("trying to create a user")
  const {name, friends, locations} = req.body
  try {
    const user = await User.create({name, friends, locations})
    res.status(200).json(user)
  }
  catch(error) {
    res.status(404).json({error: error.message})
  }
}

const deleteUser = async(req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  const user = await User.findOneAndDelete({_id: id})
  if (!user) {
    return res.status(404).JSON({error: 'no such user'})
  }
  res.status(200).json(user)
}

const updateUser = async(req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}*/

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login
const loginUser = async(req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    //create token
    const token = createToken(user._id)

    res.status(200).json({email, token})

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//signup
const signupUser = async(req, res) => {
  const {name, email, password} = req.body

  try {
    const user = await User.signup(name, email, password)

    //create token
    const token = createToken(user._id)

    res.status(200).json({email, token})

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  //getUsers,
  //getUser,
  //createUser,
  //deleteUser,
  //updateUser,
  loginUser,
  signupUser
}