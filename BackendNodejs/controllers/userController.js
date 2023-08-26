const User = require('../models/User');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const CryptoJS = require('crypto-js');

dotenv.config();

//get all the  users
const getUsers = async(req, res) => {

    const Users = await User.find({}).sort({ createdAt: -1 })

    res.status(200).json(Users)
}

//get a single user 

const getUser = async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json(err);
        }

    }
    //Make a register request by creating users
const CreateUser = async(req, res) => {

    const newUser = new User({
        name: req.body.name,
        Account: req.body.Account,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}


//login request
const UserLogin = async(req, res) => {

    try {
        const user = await User.findOne({ name: req.body.name })

        !user && res.status(401).json("Wrong Credentials");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong Credentials");

        const { password, ...others } = user._doc;
        res.status(200).json(others);


    } catch (err) {

        res.status(400).json(err)
    }
}

//delete a User 


const DeleteUser = async(req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("The user has been deleted...");
    } catch (err) {
        res.status(400).json(err);
    }

}

//update the user
const UpdateUser = async(req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }


}


module.exports = {
    getUsers,
    getUser,
    CreateUser,
    DeleteUser,
    UpdateUser,
    UserLogin



}