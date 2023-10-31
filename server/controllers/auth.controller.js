const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var express = require('express');
const app = express();
// Admin MODEL
const AdminModel = require('../models/admin.models')


//Register
const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foundAdmin = await AdminModel.findOne({ username }).exec();
    if (foundAdmin) {
      return res.status(401).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const admin = await AdminModel.create({
      username,
      password,
      password: hashedPassword,
    });
    const accessToken = jwt.sign(
      {
        AdminInfo: {
          id: admin._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      {
        AdminInfo: {
          id: admin._id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
    //   sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
      username: admin.username,
      password: admin.password,
    });
  };


  //Login
  const login = async (req, res) => {
    const {username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foundAdmin = await AdminModel.findOne({ username }).exec();
    if (!foundAdmin) {
      return res.status(401).json({ message: "Admin does not exist" });
    }
    const match = await bcrypt.compare(password, foundAdmin.password);
  
    if (!match) return res.status(401).json({ message: "Wrong Password" });
  
    const accessToken = jwt.sign(
      {
        AdminInfo: {
          id: foundAdmin._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          id: foundAdmin._id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      // sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
      email: foundAdmin.username,
    });
  };




  const refresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        const foundAdmin = await Admin.findById(decoded.AdminInfo.id).exec();
        if (!foundAdmin) return res.status(401).json({ message: "Unauthorized" });
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundAdmin._id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.json({ accessToken });
      }
    );
  };



  const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.json({ message: "Cookie cleared" });
  };



  module.exports = {
    register,
    login,
    refresh,
    logout,
  };

