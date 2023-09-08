const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser')
const {connectToMongoDB} = require('./connect');
const urlRoute = require("./routes/url");
const {restrictToLoggedinUserOnly, checkAuth,} = require('./middleware/auth')
const URL = require('./models/url');
// const { handleGetAllUsers } = require("../project/controll/ers/user");
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user')

const app = express();
port=8001;

connectToMongoDB('mongodb+srv://ishitagupta2003:qwerty12@cluster0.tpbjqib.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Mongodb connected'));

app.set("view engine" , "ejs");
//express ko bta diya ejs view engine use krenge
app.set("views",path.resolve("./views"
));
//jitni bhi meri ejs files h vo id folder m h

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
//to pass form data new middleware

// app.get("/test",async  (req,res) =>{
//     const allUrls = await URL.find({});
//     return res.render('home',{
//       urls: allUrls,
//     });
// });


app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);


app.get('/url/:shortId', async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
shortId
    },{$push:{
        visitHistory: {
           timestamp : Date.now(),
        }
    },
}
);
res.redirect(entry.redirectURL);
})

app.listen(port, () => console.log(`server started at port:${port}`));