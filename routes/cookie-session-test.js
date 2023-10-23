const express = require('express');
const router = express.Router();
const cookiePaser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

require('dotenv').config({ path: `${path.resolve(__dirname, "../")}/env/env.development` });
const cookieSignData = process.env.COOKIE_SECREAT_KEY;
const sessionSignData = process.env.SESSION_SECREAT_KEY;
const sessionSecure = process.env.SESSION_COOKIE_SECURE;
// console.log(__dirname);
// console.log(path.resolve(__dirname, "../"));
// console.log(path.resolve(__dirname, "../../"));
// console.log(sessionSignData);

//1.middleware
// router.use(cookiePaser());
// router.use(cookiePaser(cookieSignData));
router.use(
    session(
        {
            secret: sessionSignData,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: sessionSecure },
        }
    ));


//4設定 view engine 使用 ejs ，則 render 時就能不寫副檔名
// app.set("view engine", "ejs");

router.get("/setcookienonsign", cookiePaser(), (req, res) => {
    res.cookie("email", "test1234@gmail.com");
    res.send("Set Cookie");
})

router.get("/getcookienosign", cookiePaser(), (req, res) => {
    console.log(req.cookies);
    res.json(req.cookies);
})

router.get("/setcookiesign", cookiePaser(cookieSignData), (req, res) => {
    res.cookie("emailSign", "test1234@gmail.com", { signed: true });
    res.send("Set Cookie");
})

router.get("/getcookiessign", cookiePaser(cookieSignData), (req, res) => {
    console.log(req.signedCookies);
    // console.log(req.cookies);
    res.send(req.signedCookies);
})

router.get("/clearcookies", (req, res) => {
    res.clearCookie("email");
    res.clearCookie("emailSign");
    res.clearCookie("test1");
    res.clear
    res.send("cleared the cookies");
})



module.exports = router;





