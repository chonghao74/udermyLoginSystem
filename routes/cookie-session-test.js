const express = require('express');
const router = express.Router();
const cookiePaser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
// const { runInContext } = require('vm');
const flash = require('connect-flash');

require('dotenv').config({ path: `${path.resolve(__dirname, "../")}/env/.env.development` });
const cookieSignData = process.env.COOKIE_SECREAT_KEY;
const sessionSignData = process.env.SESSION_SECREAT_KEY;
const url = process.env.URL;
// console.log(__dirname);
// console.log(path.resolve(__dirname, "../"));
// console.log(path.resolve(__dirname, "../../"));
//console.log(sessionSecure);

//1.middleware
// router.use(cookiePaser());
// router.use(cookiePaser(cookieSignData));
router.use(
    session({
        secret: sessionSignData,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: (url.indexOf("localhost") < 0) },
    }));
router.use(flash());

const checkUserMiddleware = (req, res, next) => {
    console.log("checkUserMiddleware");
    if (!req.session.isVerified) {

        res.redirect(process.env.URL + process.env.PORT + "/");
    }
    else {
        next();
    }
};

//4設定 view engine 使用 ejs ，則 render 時就能不寫副檔名
// app.set("view engine", "ejs");

router.get("/setcookienonsign", cookiePaser(), (req, res) => {
    res.cookie("email", "test1234@gmail.com");
    return res.send("Set Cookie");
})

router.get("/getcookienosign", cookiePaser(), (req, res) => {
    console.log(req.cookies);
    return res.json(req.cookies);
})

router.get("/setcookiesign", cookiePaser(cookieSignData), (req, res) => {
    res.cookie("emailSign", "test1234@gmail.com", { signed: true });
    return res.send("Set Cookie");
})

router.get("/getcookiessign", cookiePaser(cookieSignData), (req, res) => {
    console.log(req.signedCookies);
    // console.log(req.cookies);
    return res.send(req.signedCookies);
})

router.get("/clearcookies", (req, res) => {
    res.clearCookie("connect.sid");
    res.clearCookie("email");
    res.clearCookie("emailSign");
    res.clearCookie("test1");
    return res.send("cleared the cookies");
})


router.get("/setsession", (req, res) => {
    const data = { name: "Tim", age: 37 };
    req.session.personalData = JSON.stringify(data);
    return res.send("create session data in Sever and send session_id (cookie) to Client");
});

router.get("/seesession", (req, res) => {
    console.log(req.session);
    return res.send("See session data in Sever and send session_id (cookie) to Client");
});


router.get("/getUserData", checkUserMiddleware, (req, res) => {
    console.log(req.session);
    const data = JSON.parse(req.session.personalData);
    return res.json(data);
});

router.get("/verifyUser", (req, res) => {
    req.session.isVerified = true;
    return res.redirect(process.env.URL + process.env.PORT + "/storage/getUserData");
});


router.get("/setsessionflash", (req, res) => {
    req.flash('message', 'Flash data');
    return res.send("Set Session Flash Data");
});

router.get("/getsessionflash", (req, res) => {
    // res.send("Show Falsh data is " + (req.flash('message')) ? req.flash('message') : "Non");
    console.log(req.flash('message'));
    console.log(req.session);
    res.send("Show Falsh data is Non");
})


module.exports = router;





