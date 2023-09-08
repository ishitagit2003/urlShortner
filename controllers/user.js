const {v4: uuidv4} = require('uuid')
const User = require("../models/user");
const {setUser} = require('../service/auth')
async function handleUsersSignup(req,res){
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}

async function handleUsersLogin(req,res){
    const { email, password } = req.body;
  const user=  await User.findOne({
        email,
        password,
    });
if(!user)
    return res.render("login",{
        error:"invalid username or password"
    });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
    //homepage pe redirect
}

module.exports = {
    handleUsersSignup,
    handleUsersLogin,
}